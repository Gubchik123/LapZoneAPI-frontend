<template>
	<div class="review mt-4">
		<div
			class="review__header p-2 mb-1 bg-primary bg-opacity-50 text-white d-flex justify-content-between"
		>
			<b>{{ review.name }}</b>
			{{ format_date_time(review.created) }}
		</div>
		<div
			class="review__body d-flex justify-content-between align-items-center"
		>
			<p class="mb-0"><b>{{ type }}:</b> {{ review.body }}</p>
			<a
				@click="$emit('answer', review.name, review.id)"
				href="#review_form"
				class="btn btn-outline-info btn-sm"
			>
				Answer
			</a>
		</div>

        <div class="ms-5" v-if="children.length">
            <recursive-review
                @answer="add_answer_for_"
                :key="index"
                v-for="(child, index) in children"
                type="Answer"
                :review="child"
                :children="child.children"
            />
        </div>
	</div>
</template>

<script>
import DateTimeMixin from "@/mixins/DateTimeMixin";

export default {
	name: "recursive-review",
    mixins: [DateTimeMixin],
	props: {
		review: { type: Object, required: true },
		children: { type: Array, default: () => [] },
        type: { type: String, default: "Review" },
	},
    methods: {
        add_answer_for_(name, id) {
            this.$emit("answer", name, id);
        },
    },
};
</script>
