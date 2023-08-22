<template>
	<div class="row px-3">
		<div class="panel-bg-color col-12 py-3 rounded">
			<form @submit.prevent="add_review" class="mb-3" id="review_form">
				<!-- Username field -->
				<div>
					<label for="id_name">Username:</label>

					<input
						v-model.lazy.trim="new_review.name"
						type="text"
						name="name"
						class="form-control w-50 mb-2"
						maxlength="30"
						required=""
						id="id_name"
					/>
				</div>
				<!-- Body textarea -->
				<div>
					<label for="id_body">Body:</label>

					<textarea
						v-model.lazy.trim="new_review.body"
						name="body"
						cols="40"
						rows="10"
						class="form-control w-50 mb-2"
						required=""
						id="id_body"
					></textarea>
				</div>
				<!-- Hidden review parent id field -->
				<input
					v-model="new_review.parent_id"
					type="hidden"
					id="review_parent"
					name="review_parent_id"
				/>
				<input
					type="submit"
					:value="action"
					class="btn btn-success btn-lg mb-3"
				/>
			</form>

			<div class="reviews">
				<template v-if="reviews.length != 0">
					<Review
						@answer="add_answer_for_"
						v-for="(review, index) in reviews"
						:key="index"
						:review="review"
						:children="review.children"
					/>
				</template>
				<Alert
					v-else
					category="primary"
					message="There are no reviews yet."
				/>
			</div>
		</div>
	</div>
</template>

<script>
import BackendMixin from "@/mixins/BackendMixin.js";
import Alert from "@/components/Alert.vue";
import Review from "@/components/shop/Review.vue";

import { create_review } from "@/api/shop.js";

export default {
	name: "ProductReviews",
	mixins: [BackendMixin],
	components: { Review, Alert },
	data() {
		return {
			new_review: {
				name: "",
				body: "",
				parent_id: null,
			},
			action: "Add review",
		};
	},
	props: {
		reviews: { type: Array, required: true },
		product_id: { type: Number, required: true },
	},
	methods: {
		add_review() {
			if (!this.new_review.name || !this.new_review.body) return;
			this.new_review.product_id = this.product_id;
			create_review(this.new_review, this.server_url).then((response) => {
				if (!this.new_review.parent_id) this.reviews.unshift(response);
				else {
					const found_review = this._find_review_by_parent_id(
						this.reviews,
						this.new_review.parent_id
					);
                    console.log(found_review);
					found_review.children.unshift(response);
				}
				this._reset_data();
			});
		},
		add_answer_for_(name, id) {
			this.new_review.parent_id = id;
			this.new_review.body = `${name}, `;
			this.action = "Add answer";
		},
		_find_review_by_parent_id(reviews, parent_id) {
			for (let review of reviews) {
				if (review.id == parent_id) return review;
				if (review.children.length) {
					const found_review = this._find_review_by_parent_id(
						review.children,
						parent_id
					);
					if (found_review) return found_review;
				}
			}
		},
        _reset_data() {
            this.new_review = {
                name: "",
                body: "",
                parent_id: null,
            };
            this.action = "Add review";
        }
	},
};
</script>

<style scoped>
textarea.form-control {
	height: 150px;
}

.child-review {
	width: 90%;
}

@media screen and (max-width: 576px) {
	/* Bootstrap5 .sm breakpoint */
	#review_form .form-control,
	#review_form .btn {
		width: 100% !important;
	}

	.review__header,
	.review__body {
		flex-direction: column;
	}
	.review__body {
		align-items: start !important;
	}

	.review__body .btn {
		margin-top: 10px;
	}
}
</style>
