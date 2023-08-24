<template>
    <ProfileLayout title="Customer profile">
        <template #default>
            <!-- Block with user personal details (form) -->
            <div class="col-lg-9 col-md-12 px-0">
                <div id="content" class="panel-bg-color p-3 rounded">
                    <p class="fz-5 pt-1">
                        <b>Username:</b> {{ user.username }}
                    </p>
                    <form @submit.prevent="update">
                        <!-- Email field -->
                        <p>
                            <label for="email"><b>E-mail:</b></label>
                            <input
                                v-model.lazy.trim="user.email"
                                id="email"
                                required=""
                                type="email"
                                class="w-50 form-control"
                                placeholder="E-mail address"
                            />
                        </p>
                        <!-- Submit button -->
                        <div
                            class="submit-btn mt-3 mb-2 d-block justify-content-center"
                        >
                            <input
                                type="submit"
                                value="Update email"
                                class="btn btn-success btn-lg"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </template>
        <template #adding_content>
            <h2 class="my-3">Danger zone</h2>
            <div class="row px-3">
                <div
                    class="panel-bg-color p-3 col-12 rounded border border-2 border-danger"
                >
                    <h4>Attention!</h4>
                    <div class="fs-5">
                        <p>
                            You are about to permanently delete your
                            account. This action cannot be undone. Your
                            data, including all likes and orders, will be
                            deleted permanently.
                        </p>
                        <p>
                            If you are sure you want to proceed with
                            deleting your account, please click the button
                            below.
                        </p>
                        <DeleteAccountButton />
                        <p>
                            If you have changed your mind or accidentally
                            clicked this button, you can click the "Cancel"
                            button or simply navigate away from this zone.
                        </p>
                    </div>
                </div>
            </div>
        </template>
    </ProfileLayout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import BackendMixin from "@/mixins/BackendMixin.js";
import ProfileLayout from "@/layouts/ProfileLayout.vue";
import DeleteAccountButton from "@/components/buttons/DeleteAccountButton.vue";

export default {
	name: "UserDetailView",
	mixins: [BackendMixin],
	components: { ProfileLayout, DeleteAccountButton },
	computed: {
		...mapGetters("user", ["user"]),
	},
	methods: {
		...mapActions("user", ["update_user_email"]),
		update() {
			this.update_user_email(this.user.email);
		},
	},
};
</script>
