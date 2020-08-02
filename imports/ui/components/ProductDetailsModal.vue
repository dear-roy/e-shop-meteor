<template>

    <div>
        <!-- Modal -->
        <div class="modal fade" :id="'productDetails'+this.product._id">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{ this.product.name }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <div class="alert alert-warning" role="alert">
                            <div class="row">
                                <div class="col-6">
                                    Category <span class="badge badge-pill badge-primary">{{ this.categoryName }}</span>
                                </div>
                                <div class="col-6">
                                    Price <span class="badge badge-pill badge-primary">{{ this.product.price }}</span>
                                </div>
                            </div>
                        </div>

                        <p class="">
                            {{ this.product.description }}
                        </p>

                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import { Categories } from "../../api/categories";

    export default {
        name: "ProductDetailsModal",
        props: ['product'],
        data() {
            return {
                categoryName: '',
                productId: this.product._id
            };
        },
        meteor: {
            $subscribe: {
                categories: []
            },
        },
        methods: {
            findCategoryNameById () {
                let category = Categories.findOne({
                    "_id" : this.product.categoryId
                });

                this.categoryName = category.name;
            },
        }
    }
</script>

<style scoped>

</style>