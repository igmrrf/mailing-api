<template>
  <div id="contact">
    <b-container>
      <b-row>
        <div v-if="show" class="col-md-8 ml-auto mt-5 mr-auto border-box">
          <h2 class="text-center">
            Your vision is about to be realized. Let's join forces!
          </h2>

          <div v-if="notice != ''" class="alert alert-danger">
            There was a problem submitting your message. {{ notice }}
          </div>
          <div v-if="message != ''" class="alert alert-success">
            {{ message }}
          </div>

          <b-form @submit.prevent="sendContactMessage()" class="contact-form">
            <b-row>
              <div class="col-md-6">
                <b-input-group class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="nc-icon nc-single-02"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name"
                    v-model="contact.name"
                  />
                </b-input-group>
              </div>
              <div class="col-md-6">
                <b-input-group>
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="nc-icon nc-email-85"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email"
                    v-model="contact.email"
                  />
                </b-input-group>
              </div>
            </b-row>
            <br />
            <b-textarea
              class="form-control"
              rows="4"
              placeholder="Tell us your thoughts and feelings..."
              v-model="contact.message"
            ></b-textarea>
            <p class="text-center">
              This is the first step towards building your next great project.
              We'll help you make a lasting impact
            </p>
            <b-row>
              <div class="col-md-4 ml-auto">
                <button class="btn mt-3 btn-lg btn-fill">Send</button>
              </div>
            </b-row>
          </b-form>
        </div>

        <div class="" v-else>
          <h3>Message Was Not Successfully Sent,</h3>
          <p>
            We are experiencing some server issue please contact us through our
            hotline below
          </p>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Contact",
  components: {},

  data() {
    return {
      show: true,
      notice: "",
      contact: {
        email: "",
        message: "",
        name: "",
      },
    };
  },

  methods: {
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    sendContactMessage() {
      const { email, message, name } = this.contact;
      if (name.length < 2) {
        this.notice = "Your name is too short";
        return;
      } else if (!this.validEmail(email)) {
        this.notice = "The email address is badly formatted.";
        return;
      } else if (message.length < 10) {
        this.notice = "Your message is too short";
        return;
      }

      axios
        .post("http://localhost:3000/", { email, message, name })
        .then((res) => {
          const data = res.data;
          if (data.success) {
            this.message = data.message;
            this.contact.message = "";
            this.contact.name = "";
            this.contact.email = "";
          } else {
            this.notice = res.data.message;
          }
        })
        .catch((err) => {
          console.error(err);
          this.notice = err.message;
        });
    },
  },
};
</script>



<style scoped>
.btn {
  background-color: red;
  color: #fff;
  float: right;
}
input,
.form-control {
  background: #f7f7f7;
  outline: none;
}
.btn:hover {
  background-color: #fff;
  color: red;
}
.input-group-prepend > span {
  background-color: #141618;
}
.border-box {
  box-shadow: 0 0 5px rgba(146, 161, 176, 0.15);
  border-radius: 10px;
  padding: 3rem;
}

@media screen and (max-width: 768px) {
  .border-box {
    box-shadow: 0 0 0px;
  }
  .btn {
    float: right;
    height: 3rem;
    width: 5rem;
  }
  .input-group {
    margin-bottom: 1rem;
  }
}
</style>