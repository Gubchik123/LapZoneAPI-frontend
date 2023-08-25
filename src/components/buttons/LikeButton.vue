<template>
    <div v-if="is_user_authenticated()" class="me-auto">
        <button
            v-if="is_liked"
            @click="unlike"
            class="like btn btn-danger"
        >
            <ion-icon name="heart"></ion-icon>
        </button>
        <button
            v-else
            @click="like"
            class="like btn btn-danger"
        >
            <ion-icon name="heart-outline"></ion-icon>
        </button>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

import UserMixin from "@/mixins/UserMixin";
import BackendMixin from "@/mixins/BackendMixin";

import { add_like, delete_like } from "@/api/shop.js";

export default {
    name: "LikeButton",
    mixins: [UserMixin, BackendMixin],
    props: {
        product_id: { type: Number, required: true },
    },
    computed: {
        is_liked() {
            return this.user.liked_product_ids.includes(this.product_id);
        }
    },
    methods: {
        ...mapMutations("user", ["ADD_LIKE", "DELETE_LIKE"]),
        like() {
            add_like(this.product_id, this.server_url).then(() => {
                this.ADD_LIKE(this.product_id);
            });
        },
        unlike() {
            delete_like(this.product_id, this.server_url).then(() => {
                this.DELETE_LIKE(this.product_id);
            });
        },
    }
}
</script>