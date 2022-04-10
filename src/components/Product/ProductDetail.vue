<template>
  <div>
    <body>
      <navbar :pass_carts_length="cart_length" />
      <link
        rel="stylesheet"
        href="path/to/font-awesome/css/font-awesome.min.css"
      />

      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />

      <link
        href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      />

      <br />
      <br />
      <div class="container">
        <div class="cardproduct">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-5 col-md-5 col-sm-6">
                <div class="imgbox">
                  <img :src="product.imagePath" class="img-responsive" />
                </div>
              </div>
              <div class="col-lg-7 col-md-7 col-sm-6">
                <h3 class="card-title">{{ product.name }}</h3>

                <h4 class="box-title mt-5">Mô tả sản phẩm</h4>
                <p>
                  Lorem Ipsum available,but the majority have suffered
                  alteration in some form,by injected humour,or randomised words
                  which don't look even slightly believable.but the majority
                  have suffered alteration in some form,by injected humour
                </p>

                

                <h2 class="mt-5">Giá tiền: ₫{{ product.price.toLocaleString() }}</h2>
                <button
                  class="btn btn-danger btn-rounded mr-1"
                  @click="addToCart(product.id)"
                >
                  <i class="fa fa-shopping-cart"> Thêm vào giỏ hàng</i>
                </button>

                <button class="btn btn-primary btn-rounded">Mua ngay</button>

                <!-- <h3 class="box-title mt-5">Key Highlights</h3>
                <ul class="list-unstyled">
                  <li>
                    <i class="fa fa-check text-success"></i>Sturdy structure
                  </li>
                  <li>
                    <i class="fa fa-check text-success"></i>Designed to foster
                    easy portability
                  </li>
                  <li>
                    <i class="fa fa-check text-success"></i>Perfect furniture to
                    flaunt your wonderful collectibles
                  </li>
                </ul> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <h3 class="box-title mt-5">Nhận xét từ khách hàng</h3>
        <div class="card">
          <div class="card-body">
            <div
              class="row"
              v-for="comment in product.comments"
              v-bind:key="comment.review_id"
            >
              <div class="col-md-3">
                <img
                  :src="comment.customeravatar"
                  class="img img-rounded img-fluid"
                />
                <p class="text-secondary text-center">{{ comment.date }}</p>
              </div>
              <div class="col-md-9">
                <p>
                  <a class="float-left"
                    ><strong>{{ comment.customername }}</strong></a
                  >
                </p>
                <div class="star-rating">
                  <span
                    v-for="n in getRating(comment.id)"
                    :key="n"
                    class="float-right"
                  >
                    <i class="text-warning fa fa-star"></i>
                  </span>
                </div>

                <div class="clearfix"></div>
                <p>
                  Lorem Ipsum is simply dummy text of the pr make but also the
                  leap into electronic typesetting, remaining essentially
                  unchanged. It was popularised in the 1960s with the release of
                  Letraset sheets containing Lorem Ipsum passages, and more
                  recently with desktop publishing software like Aldus PageMaker
                  including versions of Lorem Ipsum.
                </p>
                <p>{{comment.customercmt}}</p>
                <p>
                  <a class="float-right btn btn-outline-primary ml-2">
                    <i class="fa fa-reply"></i> Reply</a
                  >
                  <a class="float-right btn text-white btn-danger">
                    <i class="fa fa-heart"></i> Like</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <h3 class="box-title mt-5">Đánh giá sản phẩm</h3>
          <div class="row">
            <!-- <div class="col-sm-4"></div> -->
            <div class="text-center">
              <star-rating
                :show-rating="false"
                @rating-selected="setRating"
              ></star-rating>
              <div style="margin-top: 10px; font-weight: bold">
                {{ rating }}
              </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="comment">Comment:</label>
          <textarea
            v-model="message"
            placeholder="Nhận xét...."
            class="form-control"
            rows="5"
          ></textarea>

          <!-- <textarea class="form-control" rows="5" id="comment"></textarea> -->
          <div style="margin-top: 10px; font-weight: bold">
            <!-- {{ message }} -->
          </div>
        </div>
        <div class="container">
          <div class="text-center">
            <button
              type="button"
              @click="postComment(ratingNum, message)"
              class="btn btn-success"
            >
              Gửi phản hồi
            </button>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<style scoped>
body {
  background-color: white;
  margin-top: 20px;
}
.cardproduct {
  margin-bottom: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: white;
  background-clip: border-box;
  border: 0 solid transparent;
  border-radius: 0;
}
.table-product.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f3f8fa !important;
}
.table-product td {
  border-top: 0px solid #dee2e6 !important;
  color: #728299 !important;
}
.imgbox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}
img {
  border-radius: 20px 20px 0 0;
  width: 60%;
  height: 250px;
  width: 300px;
}
body {
  margin-top: 20px;
  background: #eee;
}
</style>


<script>
import CartService from "@/api-services/CartService";
import ProductService from "@/api-services/ProductService";
import Navbar from "@/components/Navbar";

import StarRating from "vue-star-rating";
export default {
  name: "ProductDetail",
  components: {
    Navbar,
    StarRating,
  },
  data() {
    return {
      id: "",
      product: [],
      cart_length: 0,
      rating: "No Rating Selected",
      ratingNum: 0,
      message: "",
    };
  },
  created() {
    CartService.getCart().then((response) => {
      this.cart_length = response.data.length;
      console.log(this.cart_length);
    });
  },
  mounted() {
    this.id = this.$route.params.id;
    console.log(this.id);

    ProductService.getProduct(this.id).then((response) => {
      this.product = response.data;
      // console.log(JSON.stringify(this.product.comments));
    });
  },
  methods: {
    addToCart(product_id) {
      CartService.addToCart(product_id).then((response) => {
        this.cart_length = response.data.length;
        console.log("product list (cart-length): " + this.cart_length);
        console.log('add to cart ' + JSON.stringify(response.data));
      });
    },
    getRating(review_id) {
      for (let i = 0; i < this.product.comments.length; i++) {
        if (review_id == this.product.comments[i].id) {
          return this.product.comments[i].customerrating;
        }
      }
    },
    postComment(rating, comment) {
      // console.log(rating);
      // console.log(comment);

      const data = JSON.stringify({
        customername: "Anonymous",
        customeravatar:
          "https://cdn-icons-png.flaticon.com/512/194/194938.png",
        customercmt: comment,
        customerrating: rating,
        date: "",
      });

      ProductService.addComment(this.id, data).then((response) => {
      this.product = response.data;
      // console.log(this.product);
    });

    },
    setRating(ratingCount) {
      //console.log(ratingCount)
      this.ratingNum = ratingCount;
      switch (ratingCount) {
        case 1:
          this.rating = "Chất lượng sản phẩm quá tệ";
          break;
        case 2:
          this.rating = "Chất lượng sản phẩm chưa thực sự tốt";
          break;
        case 3:
          this.rating = "Chất lượng sản phẩm ở mức trung bình";
          break;
        case 4:
          this.rating = "Chất lượng sản phẩm khá tốt";
          break;
        case 5:
          this.rating = "Chất lượng sản phẩm tuyệt vời";
          break;
      }
    },
  },
};
</script>

