<template>
	<div
		:class="'alert-' + category, {
            'alert-dismissible fade show': is_dismissible 
        }"
		role="alert"
		class="my-3 mx-1 alert"
	>
		<div class="d-flex align-items-center">
            <div class="me-3">
                <template v-if="category == 'primary'">
                    <ion-icon v-pre name="alert-circle"></ion-icon>
                </template>
                <template v-else-if="category == 'success'">
                    <ion-icon v-pre name="checkmark-circle"></ion-icon>
                </template>
                <template v-else>
                    <ion-icon v-pre name="warning"></ion-icon>
                </template>
            </div>
            <div class="w-100 content-center overflow-auto">
                <h5>{{ message }}</h5>
            </div>
        </div>

        <button
            v-if="is_dismissible"
			type="button"
			class="btn-close"
			aria-label="Close"
			data-bs-dismiss="alert"
		></button>
	</div>
</template>

<script>
export default {
	name: "Alert",
	props: {
		category: { type: String, required: true },
		message: { type: String, required: true },
		is_dismissible: { type: Boolean, default: false },
	},
};
</script>
