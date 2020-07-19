<template>

    <div>
        <!-- Modal -->
        <div class="modal fade" id="addProductModal">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New Product</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                        <div class="modal-body">

                            <div class="form-group">
                                <label for="productName">Product Name</label>
                                <input v-model="newProduct.productName" type="text" class="form-control" id="productName" placeholder="Name">
                            </div>

                            <div class="form-group">
                                <label for="productPrice">Price</label>
                                <input v-model="newProduct.productPrice" type="number" class="form-control" id="productPrice" placeholder="Price">
                            </div>

                            <div class="form-group">
                                <label for="productCategory">Category</label>
                                <select v-model="newProduct.selectedCategory" class="form-control" id="productCategory">
                                    <option>Default select</option>
                                    <option v-bind:value="category._id" v-for="category in categories"> {{ category.name }} </option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="productDescription">Description</label>
                                <textarea v-model="newProduct.productDescription" class="form-control" id="productDescription" rows="3"></textarea>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" @click.prevent="addNewProduct">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import { Categories } from "../../api/categories";

    export default {
        name: "AddProductModal",
        data () {
            return {
                newProduct: {
                    selectedCategory: '',
                    productName: '',
                    productPrice: '',
                    productDescription: ''
                }
            };
        },
        meteor: {
            $subscribe: {
                products: [],
                categories: []
            },
            categories() {
                return Categories.find({}).fetch();
            }
        },
        methods: {
            addNewProduct() {
                Meteor.call(
                    "products.insert",
                    this.newProduct.productName,
                    this.newProduct.productPrice,
                    this.newProduct.selectedCategory,
                    this.newProduct.productDescription
                );

                this.newProduct.productName = '',
                this.newProduct.productPrice = '',
                this.newProduct.selectedCategory = '',
                this.newProduct.productDescription = ''
            }
        }
    }
</script>

<style scoped>

</style>