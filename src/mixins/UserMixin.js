import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters("user", ["user", "user_id"])
    },
    methods: {
        is_user_authenticated() {
            return this.user === null;
        },
        current_user_id() {
            return this.user_id;
        },
    }
}