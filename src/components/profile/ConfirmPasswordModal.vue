<template>
	<div class="mt-1 mb-2">
		<div class="modal-body">
			<div class="form-floating text-dark">
				<input
					v-model.lazy.trim="current_password"
					id="password"
					type="password"
					class="form-control w-50"
					placeholder="Current password"
				/>
				<label for="password">Current password</label>
			</div>
			<div class="text-white bg-danger w-50">
				{{ error_message }}
			</div>
		</div>
		<div class="modal-footer mt-1 w-50">
			<button
                v-if="can_cancel"
				@click="$emit('cancel')"
				type="button"
				class="btn btn-secondary me-2"
			>
				Cancel
			</button>
			<button @click="confirm" type="button" class="btn btn-success">
				Confirm
			</button>
		</div>
	</div>
</template>

<script>
export default {
    name: "ConfirmPasswordModal",
    props: {
        can_cancel: { type: Boolean, default: false },
        error_message: { type: String, required: true },
    },
    data() {
        return { current_password: "" };
    },
    methods: {
        confirm() {
            this.$emit("confirm", this.current_password);
        },
    },
};
</script>
