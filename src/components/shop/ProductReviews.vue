<template>
	<div class="row px-3">
		<div class="panel-bg-color col-12 py-3 rounded">
			<form class="mb-3" id="review_form">
				<!-- Username field -->
				<div>
					<label for="id_name">Username:</label>

					<input
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
					type="hidden"
					id="review_parent"
					name="review_parent_id"
				/>
				<input
					type="submit"
					value="Add review"
					class="btn btn-success btn-lg mb-3"
				/>
			</form>

			<div class="reviews">
				<template v-if="reviews.length != 0">
					<div
						:key="index"
						v-for="(review, index) in reviews"
						class="review mt-4"
					>
						<div
							class="review__header p-2 mb-1 bg-primary bg-opacity-50 text-white d-flex justify-content-between"
						>
							<b>{{ review.name }}</b>
							{{ review.created }}
						</div>
						<div
							class="review__body d-flex justify-content-between align-items-center"
						>
							<p class="mb-0"><b>Review:</b> {{ review.body }}</p>
							<a
								href="#review_form"
								class="btn btn-outline-info btn-sm"
								onclick="add_answer_for_('{{ review.name }}', '{{ review.id }}')"
							>
								Answer
							</a>
						</div>
					</div>
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
import Alert from "@/components/Alert.vue";

export default {
	name: "ProductReviews",
	components: { Alert },
	props: {
		reviews: {
			type: Array,
			required: true,
		},
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
