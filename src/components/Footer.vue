<template>
	<footer class="panel-bg-color pt-5 pb-4">
		<div class="container">
			<div class="row d-flex justify-content-between">
				<div class="col-6 mb-3">
					<h5>Navigation</h5>
					<ul class="nav flex-column">
						<li class="nav-item mb-2">
							<router-link
								to="/"
								class="nav-link text-color w-25 p-0"
							>
								Home
							</router-link>
						</li>
						<li class="nav-item mb-2">
							<a
								target="_blank"
								class="nav-link text-color w-25 p-0"
								href="https://itish.live"
							>
								Blog
							</a>
						</li>
						<li class="nav-item mb-2">
							<router-link
								:to="{ name: 'faqs' }"
								class="nav-link text-color w-25 p-0"
							>
								FAQs
							</router-link>
						</li>
						<li class="nav-item mb-2">
							<router-link
								:to="{ name: 'about' }"
								class="nav-link text-color w-25 p-0"
							>
								About
							</router-link>
						</li>
					</ul>
				</div>

				<div class="col-md-5 offset-md-1 mb-3">
					<h5>Subscribe to our mailing</h5>
					<p>Monthly digest of what's new and exciting from us.</p>

					<MailingForm />
				</div>
			</div>

			<div class="d-flex justify-content-between pt-4 mt-4 border-top">
				<p>&copy; {{ current_year }}</p>
				<!-- Author's social networks -->
				<ul class="list-unstyled d-flex">
					<li>
						<a
							target="_blank"
							href="https://www.linkedin.com/in/nikita-hubariev/"
						>
							<ion-icon v-pre name="logo-linkedin"></ion-icon>
						</a>
					</li>
					<li class="ms-3">
						<a target="_blank" href="https://github.com/Gubchik123">
							<ion-icon v-pre name="logo-github"></ion-icon>
						</a>
					</li>
					<li class="ms-3">
						<a target="_blank" href="https://t.me/nikita_id791">
							<ion-icon v-pre name="navigate-circle"></ion-icon>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</footer>
</template>

<script>
import MailingForm from "./forms/MailingForm.vue";

export default {
	name: "Footer",
	components: { MailingForm },
	computed: {
		current_year() {
			return new Date().getFullYear();
		},
	},
};
</script>
