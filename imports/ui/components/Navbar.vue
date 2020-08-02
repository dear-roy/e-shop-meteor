<template>

    <div>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">

            <a class="navbar-brand" href="#">e-shop</a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav mr-auto">

                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>

                    <li v-if="isLogin" class="nav-item">
                        <a class="nav-link" href="#" data-toggle="modal" data-target="#addProductModal">Add Product</a>
                    </li>

                    <li v-if="isLogin" class="nav-item">
                        <a class="nav-link" href="#" data-toggle="modal" data-target="#addCategoryModal">Add Category</a>
                    </li>

                </ul>

                <div class="float-right">
                    <button v-if="isLogin" class="btn btn-outline-light" @click.prevent="logout">Logout</button>
                    <button v-else class="btn btn-outline-light" data-toggle="modal" data-target="#loginModal">Login</button>
                </div>

            </div>
        </nav>

      <!-- Modal -->
      <div class="modal fade" id="loginModal">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Login</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form @submit.prevent="login(email, password)">

              <div class="modal-body">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" v-model="email" class="form-control" id="email" required>
                </div>

                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" v-model="password" class="form-control" id="password" required>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" @click.prevent="login(email, password)">Login</button>
              </div>

            </form>

          </div>
        </div>
      </div>

    </div>

</template>

<script>

    import {Users} from "../../api/users";

    export default {
        props: ["isLoggedIn"],
        components: {
            //
        },
        data() {
            return {
              isLogin: false,
              user: {},
              email: '',
              password: ''
            };
        },
        mounted() {
          console.log(this.user);
        },
        methods : {
            login (email, password) {
              if (email && password && !this.isLogin) {
                let user = Users.findOne({
                  email: email,
                  password: password
                });
                if (user) {
                  this.user = user;
                  this.isLogin = true;
                }
              }
            },
            logout () {
              if (Object.keys(this.user).length > 0 && this.isLogin) {
                this.user = {};
                this.isLogin = !this.isLogin;
                this.$emit('loggedUser', this.user);
              }
            }
          }
    };
</script>

<style scoped>

</style>