<template>

    <div>
        <!-- Modal -->
        <div class="modal fade" id="addCategoryModal">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add new Category</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form @submit.prevent="createCategory">

                        <div class="modal-body">
                            <div class="form-group">
                                <label for="categoryName">Category Name</label>
                                <input type="text" v-model="newCategory" class="form-control" id="categoryName">
                            </div>

                            <table class="table table-borderless table-sm">
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="category in categories">
                                    <td>{{ category.name }}</td>
                                    <td>
                                        <button class="btn btn-outline-danger" @click.prevent="deleteCategory(category._id)">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" @click.prevent="createCategory">Save changes</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {Categories} from "../../api/categories";

    export default {
        name: "AddCategoryModal",
        data () {
            return {
                newCategory: ""
            };
        },
        meteor: {
            $subscribe: {
                categories: []
            },
            categories() {
                return Categories.find({}).fetch();
            }
        },
        methods: {
            createCategory() {
                Meteor.call('categories.insert', this.newCategory);
                // Clear form
                this.newCategory = "";
            },
            deleteCategory(id) {
                Meteor.call('categories.remove', id);
            }
        }
    }
</script>

<style scoped>

</style>