<template>
    <Alert
        v-if="cart_products.length == 0"
        category="primary"
        message="There are no products in your cart yet"
    />
	<div v-else>
        <items-table 
            @update="update"
            @delete="delete_cart_product"
            :collection="cart_products" 
        />

        <div class="d-flex justify-content-between fs-4 mt-3">
            <b>Total price: </b>
            <span id="total_price"> {{ cart_total_price }}$ </span>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Alert from "@/components/Alert.vue";
import ItemsTable from "@/components/ItemsTable.vue";

export default {
    name: "CartTable",
    components: { Alert, ItemsTable },
    computed: {
        ...mapGetters("cart", ["cart_products", "cart_total_price"]),
    },
    methods: {
        ...mapActions("cart", ["update_cart_product", "delete_cart_product"]),
        update(product_id, quantity) {
            if (quantity < 1) {
                alert("Minimum quantity is 1!");
                return;
            }
            if (quantity > 10) {
                alert("Maximum quantity is 10!");
                return;
            }
            this.update_cart_product({product_id, quantity});
        },
    },
}
</script>

<style>
.white-space-nowrap {
	white-space: nowrap;
}
.white-space-normal {
	white-space: normal;
}

.table {
	color: var(--text-color);
}
.table td,
.table th {
	flex: 1;
	border: 0;
    min-width: 100px;
	text-align: center;
}
.table .image-td {
	width: 10%;
}
.table img {
	min-width: 100px;
}
.table input[type="number"] {
	width: 75px;
}
</style>
