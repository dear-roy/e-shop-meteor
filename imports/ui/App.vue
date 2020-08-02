<template>
    <div>
        <Navbar :is-logged-in="isLoggedIn" @loggedUser="loggedUser"/>
        <br/>
        <div class="container mt-5">
            <div class="row">

                <div class="col-11">
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

              <div class="col-1">
                <p class="lead mt-3 small">
                  Products:
                  <span id="productAmount">
                    {{ totalProducts }}
                  </span>
                </p>
              </div>

                <ProductCard
                    v-if="products"
                    v-for="product in products"
                    v-bind:key="product._id"
                    v-bind:product="product"
                />

                <template v-if="products.length === 0">
                    <div class="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </template>

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
    import { Users } from "../api/users";

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
                selectedCategoryName: '',
                isLoading: true,
                totalProducts: null,
                isLoggedIn: false,
                loggedUserData: {}
            };
        },
        mounted() {
            //this.isLoading = true;
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
                this.totalProducts = products.length;
            },
          loggedUser (value) {
              this.loggedUserData = value;
          }
        },
        meteor: {
            $subscribe: {
                products: [],
                categories: [],
                users: []
            },
            products() {
                if (this.selectedCategory === null) {
                    setTimeout(() => {
                        return this.products = Products.find({}).fetch();
                    }, 1000);
                  this.totalProducts = this.products.length;
                }
            },
            categories() {
                return Categories.find({}).fetch();
            },
            users() {
              return Users.find().fetch({});
            }
        }
    };
</script>

<style scoped>

</style>