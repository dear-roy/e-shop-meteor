<template>
    <div class="col-3 mb-3">

        <div class="card p-2" style="width: 18rem;">
            <img src="https://picsum.photos/80/60" class="card-img-top" alt="product">
            <div class="alert alert-warning text-center" role="alert">
                <div class="row">
                    <div class="col">{{ this.findCategoryNameById(this.product.categoryId) }}</div>
                    <div class="col">$ {{ this.product.price }}</div>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ this.product.name }}</h5>
                <p class="card-text">
                    <!--{{ this.product.description }}-->
                </p>
                <a href="#" class="btn btn-outline-primary" data-toggle="modal" :data-target="'#productDetails'+this.product._id">
                    <i class="fa fa-eye" aria-hidden="true"></i> View Details
                </a>
                <a href="#" class="btn btn-outline-success" data-toggle="modal" :data-target="'#editProductModal'+this.product._id">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </a>
                <a href="#" class="btn btn-outline-danger" @click.prevent="deleteProduct(productId)">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </a>
            </div>
        </div>

        <ProductDetailsModal
                v-bind:key="this.product._id"
                v-bind:product="this.product"
        />

        <EditProductModal v-bind:product="this.product" />

    </div>
</template>

<script>
    import ProductDetailsModal from "./ProductDetailsModal";
    import { Categories } from "../../api/categories";
    import EditProductModal from "./EditProductModal";

    export default {
        name: "ProductCard",
        props: ['product'],
        components: {
            EditProductModal,
            ProductDetailsModal
        },
        data() {
            return {
                categoryName: '',
                productId: this.product._id
            };
        },
        mounted() {
            //this.findCategoryNameById();
        },
        meteor: {
            $subscribe: {
                products: [],
                categories: []
            },
        },
        methods: {
            findCategoryNameById (id) {
                let category = Categories.findOne({
                    "_id" : id //this.product.categoryId
                });

                //console.log(category)

                return this.categoryName = category.name;
            },
            deleteProduct(id){
                swal({
                    title: "Are you sure want to delete "+ this.product.name +"?",
                    text: "Once deleted, you will not be able to recover this product!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        Meteor.call('products.remove', this.productId);
                        swal("Poof! Your "+ this.product.name +" has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your "+ this.product.name +" is safe!");
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>