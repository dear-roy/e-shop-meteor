<template>

    <div>
        <!-- Modal -->
        <div class="modal fade" :id="'editProductModal'+this.product._id">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{ this.product.name }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                        <input type="hidden" class="hidden" v-model="editProduct.id">
                        <div class="modal-body">

                            <div class="form-group">
                                <label for="productName">Product Name</label>
                                <input v-model="editProduct.productName" type="text" class="form-control" id="productName" placeholder="Name">
                            </div>

                            <div class="form-group">
                                <label for="productPrice">Price</label>
                                <input v-model="editProduct.productPrice" type="number" class="form-control" id="productPrice" placeholder="Price">
                            </div>

                            <div class="form-group">
                                <label for="productCategory">Category</label>
                                <select v-model="editProduct.selectedCategory" class="form-control" id="productCategory">
                                    <option>Default select</option>
                                    <option v-bind:value="category._id" v-for="category in categories"> {{ category.name }} </option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="productDescription">Description</label>
                                <textarea v-model="editProduct.productDescription" class="form-control" id="productDescription" rows="3"></textarea>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" @click.prevent="updateProduct">Update</button>
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
        name: "EditProductModal",
        props: ['product'],
        data () {
            return {
                editProduct: {
                    id: this.product._id,
                    selectedCategory: this.product.categoryId,
                    productName: this.product.name,
                    productPrice: this.product.price,
                    productDescription: this.product.description
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
            updateProduct() {
                Meteor.call(
                    'products.update',
                    this.editProduct.id,
                    this.editProduct.productName,
                    this.editProduct.productPrice,
                    this.editProduct.selectedCategory,
                    this.editProduct.productDescription
                );
            }
        }
    }
</script>

<style scoped>

</style>