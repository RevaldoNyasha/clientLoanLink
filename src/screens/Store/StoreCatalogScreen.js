import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useRef, useState } from 'react';
import {
    Animated,
    Easing,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Card from '../../components/Card';
import { useCart } from '../../context/CartContext';
import { storeProducts } from '../../data/storeProducts';

const StoreCatalogScreen = ({ navigation }) => {
  const { addToCart, getCartItemCount } = useCart();
  // Search
  const [searchQuery, setSearchQuery] = useState('');
  // Filters (multi-select)
  const [selectedStores, setSelectedStores] = useState([]); // e.g., ['Edgars', 'TV Sales & Home']
  const [selectedTerms, setSelectedTerms] = useState([]);   // e.g., [3,6,12]
  // Dropdowns
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const filterAnim = useRef(new Animated.Value(0)).current; // 0 closed, 1 open
  const sortAnim = useRef(new Animated.Value(0)).current;
  const searchAnim = useRef(new Animated.Value(0)).current;
  const [sortBy, setSortBy] = useState('date_desc'); // 'price_asc'|'price_desc'|'date_desc'|'date_asc'

  const stores = ['Edgars', 'TV Sales & Home'];

  const termOptions = useMemo(() => {
    const set = new Set();
    storeProducts.forEach(p => (p.creditTerms || []).forEach(t => set.add(t)));
    return Array.from(set).sort((a, b) => Number(a) - Number(b));
  }, []);

  const products = useMemo(() => {
    // Start with all
    let base = storeProducts.slice();

    // Store filters
    if (selectedStores.length > 0) {
      base = base.filter(p => selectedStores.includes(p.storeName));
    }

    // Term filters
    if (selectedTerms.length > 0) {
      base = base.filter(p => {
        const terms = p.creditTerms || [];
        return selectedTerms.some(t => terms.includes(t));
      });
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      base = base.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.storeName.toLowerCase().includes(q)
      );
    }

    // Sorting
    base.sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'date_asc') return new Date(a.dateAdded) - new Date(b.dateAdded);
      // default newest first
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    });

    return base;
  }, [selectedStores, selectedTerms, searchQuery, sortBy]);

  const toggleAnimated = (anim, open) => {
    Animated.timing(anim, {
      toValue: open ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  };

  const toggleFilter = () => {
    const next = !filterOpen;
    setFilterOpen(next);
    if (next) setSortOpen(false);
    toggleAnimated(filterAnim, next);
    if (sortOpen) toggleAnimated(sortAnim, false);
  };

  const toggleSort = () => {
    const next = !sortOpen;
    setSortOpen(next);
    if (next) setFilterOpen(false);
    toggleAnimated(sortAnim, next);
    if (filterOpen) toggleAnimated(filterAnim, false);
  };

  const toggleSearch = () => {
    const next = !searchOpen;
    setSearchOpen(next);
    toggleAnimated(searchAnim, next);
  };

  const isAllCleared = selectedStores.length === 0 && selectedTerms.length === 0 && !searchQuery.trim();

  const handleOutsidePress = () => {
    if (filterOpen) { setFilterOpen(false); toggleAnimated(filterAnim, false); }
    if (sortOpen) { setSortOpen(false); toggleAnimated(sortAnim, false); }
    if (searchOpen) { setSearchOpen(false); toggleAnimated(searchAnim, false); }
  };

  const toggleStore = (name) => {
    setSelectedStores(prev => prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]);
  };

  const toggleTerm = (term) => {
    setSelectedTerms(prev => prev.includes(term) ? prev.filter(t => t !== term) : [...prev, term]);
  };

  const clearAllFilters = () => {
    setSelectedStores([]);
    setSelectedTerms([]);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Removed Buy on Credit action per requirements

  const handleCartPress = () => {
    navigation.navigate('CartScreen');
  };

  const renderProduct = ({ item: product }) => (
    <Card style={styles.productCard}>
      <View style={styles.row}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.store}>{product.storeName}</Text>
          <Text style={styles.price}>${product.price.toLocaleString()}</Text>

          <View style={styles.termsRow}>
            <Ionicons name="time-outline" size={16} color="#FF6B35" />
            <Text style={styles.termsText}>Pay over {product.creditTerms.join(', ')} months</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(product)}>
              <Ionicons name="cart" size={16} color="#fff" />
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );

  const FilterDropdown = () => {
    const height = filterAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 220] });
    const opacity = filterAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
    return (
      <Animated.View style={[styles.dropdownPanel, { height, opacity }]}> 
        <ScrollView contentContainerStyle={styles.dropdownContent}>
          <TouchableOpacity style={styles.dropdownRow} onPress={clearAllFilters}>
            <Ionicons name="layers-outline" size={18} color={isAllCleared ? '#007AFF' : '#666'} />
            <Text style={[styles.dropdownText, isAllCleared && styles.dropdownTextActive]}>All Products</Text>
          </TouchableOpacity>
          <View style={styles.dropdownSectionHeader}><Text style={styles.dropdownSectionHeaderText}>Stores</Text></View>
          {stores.map(s => (
            <TouchableOpacity key={s} style={styles.dropdownRow} onPress={() => toggleStore(s)}>
              <Ionicons name={selectedStores.includes(s) ? 'checkbox' : 'square-outline'} size={18} color={selectedStores.includes(s) ? '#007AFF' : '#666'} />
              <Text style={[styles.dropdownText, selectedStores.includes(s) && styles.dropdownTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.dropdownSectionHeader}><Text style={styles.dropdownSectionHeaderText}>Credit Terms</Text></View>
          {termOptions.map(t => (
            <TouchableOpacity key={t} style={styles.dropdownRow} onPress={() => toggleTerm(t)}>
              <Ionicons name={selectedTerms.includes(t) ? 'checkbox' : 'square-outline'} size={18} color={selectedTerms.includes(t) ? '#007AFF' : '#666'} />
              <Text style={[styles.dropdownText, selectedTerms.includes(t) && styles.dropdownTextActive]}>Available on {t}-Month Credit</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    );
  };

  const SortDropdown = () => {
    const height = sortAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 160] });
    const opacity = sortAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
    const Item = ({ label, value }) => (
      <TouchableOpacity
        style={styles.dropdownRow}
        onPress={() => { setSortBy(value); toggleSort(); }}
      >
        <Ionicons name={sortBy === value ? 'radio-button-on' : 'radio-button-off'} size={18} color={sortBy === value ? '#007AFF' : '#666'} />
        <Text style={[styles.dropdownText, sortBy === value && styles.dropdownTextActive]}>{label}</Text>
      </TouchableOpacity>
    );
    return (
      <Animated.View style={[styles.dropdownPanel, { height, opacity }]}> 
        <ScrollView contentContainerStyle={styles.dropdownContent}>
          <Item label="Price: Low to High" value="price_asc" />
          <Item label="Price: High to Low" value="price_desc" />
          <Item label="Date: Newest First" value="date_desc" />
          <Item label="Date: Oldest First" value="date_asc" />
        </ScrollView>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Store</Text>
          <TouchableOpacity style={styles.cartButton} onPress={handleCartPress}>
            <Ionicons name="cart-outline" size={24} color="#007AFF" />
            {getCartItemCount() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getCartItemCount()}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionPill} onPress={toggleFilter}>
          <Ionicons name="options-outline" size={16} color="#007AFF" />
          <Text style={styles.actionPillText}>Filter</Text>
          <Ionicons name={filterOpen ? 'chevron-up' : 'chevron-down'} size={16} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionPill} onPress={toggleSort}>
          <Ionicons name="swap-vertical" size={16} color="#007AFF" />
          <Text style={styles.actionPillText}>Sort By</Text>
          <Ionicons name={sortOpen ? 'chevron-up' : 'chevron-down'} size={16} color="#007AFF" />
        </TouchableOpacity>

        <View style={styles.searchInlineContainer}>
          {!searchOpen && (
            <TouchableOpacity style={styles.searchIconButton} onPress={toggleSearch}>
              <Ionicons name="search" size={18} color="#007AFF" />
            </TouchableOpacity>
          )}
          <Animated.View
            style={[
              styles.searchInline,
              {
                opacity: searchAnim,
                transform: [{ scaleX: searchAnim }],
                width: searchOpen ? undefined : 0,
              },
            ]}
          >
            <Ionicons name="search" size={16} color="#666" />
            <TextInput
              style={styles.searchInlineInput}
              placeholder="Search products or stores..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
              autoFocus={searchOpen}
              onBlur={() => { if (!searchQuery) toggleSearch(); }}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color="#666" />
              </TouchableOpacity>
            )}
          </Animated.View>
        </View>
      </View>

      {(filterOpen || sortOpen) && (
        <Pressable style={styles.overlay} onPress={handleOutsidePress} />
      )}

      {filterOpen && <FilterDropdown />}
      {sortOpen && <SortDropdown />}

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 6 },
  cartButton: { position: 'relative', padding: 8 },
  cartBadge: {
    position: 'absolute', top: 0, right: 0, backgroundColor: '#FF6B35', borderRadius: 10,
    minWidth: 20, height: 20, justifyContent: 'center', alignItems: 'center',
  },
  cartBadgeText: { fontSize: 12, fontWeight: 'bold', color: '#fff' },
  actionsRow: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 8 },
  actionPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E7F1FF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, marginRight: 8 },
  actionPillText: { color: '#007AFF', fontSize: 12, fontWeight: '600', marginHorizontal: 6 },
  searchInlineContainer: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  searchIconButton: { marginLeft: 'auto', backgroundColor: '#E7F1FF', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 16 },
  searchInline: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#e9ecef', borderRadius: 16, paddingHorizontal: 10, paddingVertical: 6 },
  searchInlineInput: { flex: 1, marginHorizontal: 6, fontSize: 14, color: '#333' },
  overlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.08)' },
  dropdownPanel: { backgroundColor: '#fff', overflow: 'hidden', borderBottomWidth: 1, borderBottomColor: '#e9ecef' },
  dropdownContent: { paddingHorizontal: 16, paddingVertical: 12 },
  dropdownRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  dropdownText: { marginLeft: 8, fontSize: 14, color: '#333' },
  dropdownTextActive: { color: '#007AFF', fontWeight: '600' },
  dropdownSectionHeader: { marginTop: 8, marginBottom: 4 },
  dropdownSectionHeaderText: { fontSize: 12, color: '#666', fontWeight: '600' },
  list: { paddingBottom: 16 },
  productCard: { marginHorizontal: 16, marginBottom: 16 },
  row: { flexDirection: 'row' },
  image: { width: 110, height: 90, borderRadius: 8, backgroundColor: '#e9ecef' },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  store: { fontSize: 12, color: '#666', marginTop: 2 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#007AFF', marginTop: 6 },
  termsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  termsText: { fontSize: 12, color: '#666', marginLeft: 6 },
  actions: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  addButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#007AFF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, marginRight: 8 },
  addButtonText: { color: '#fff', fontSize: 12, fontWeight: '600', marginLeft: 6 },
  
});

export default StoreCatalogScreen;


