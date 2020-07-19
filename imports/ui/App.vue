<template>
    <div>
        <Navbar/>
        <br/>
        <div class="container mt-5">
            <div class="row">

                <div class="col-12">
                    <p class="display-4">
                        Showing Products

                        <select
                                v-model="selectedCategory"
                                class="custom-select category-select col-3"
                                id="inputGroupSelect01"
                                @change.prevent="getProductsByCategory"
                        >
                            <option v-bind:value="null" selected>All</option>
                            <option
                                    v-bind:value="category._id"
                                    v-for="category in categories"
                            >
                                {{ category.name }}
                            </option>
                        </select>

                    </p>
                </div>

                <ProductCard
                    v-for="product in products"
                    v-bind:key="product._id"
                    v-bind:product="product"
                />

                <AddCategoryModal/>
                <AddProductModal/>

            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from "./components/Navbar";
    import ProductCard from "./components/ProductCard";
    import AddProductModal from "./components/AddProductModal";
    import AddCategoryModal from "./components/AddCategoryModal";

    import { Products } from "../api/products";
    import { Categories } from "../api/categories";

    export default {
        components: {
            Navbar,
            ProductCard,
            AddProductModal,
            AddCategoryModal
        },
        data() {
            return {
                products: [],
                selectedCategory: null,
                selectedCategoryName: ''
            };
        },
        mounted() {
            if (this.selectedCategory === null) {
                this.selectedCategoryName = 'All';
            }
        },
        methods: {
            findCategoryNameById (id) {
                let category = Categories.findOne({
                    "_id" : id
                });

                this.selectedCategoryName = category.name;
                this.selectedCategory = '';
            },
            getProductsByCategory () {
                let products = Products.find({
                    "categoryId" : this.selectedCategory
                }).fetch();

                this.products = products;
            }
        },
        meteor: {
            $subscribe: {
                products: [],
                categories: []
            },
            products() {
                if (this.selectedCategory === null) {
                    return this.products = Products.find({}).fetch();
                }
            },
            categories() {
                return Categories.find({}).fetch();
            }
        }
    };
</script>

<style scoped>

</style>