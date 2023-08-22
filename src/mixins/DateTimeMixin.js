export default {
    methods: {
        format_date_time(input_date) {
            const date = new Date(input_date);
            const day = this._get_string_from_(date.getDate());
            const month = this._get_string_from_(date.getMonth() + 1)
            const year = date.getFullYear();
            const hours = this._get_string_from_(date.getHours())
            const minutes = this._get_string_from_(date.getMinutes())
          
            return `${day}.${month}.${year} ${hours}:${minutes}`;
        },
        _get_string_from_(date_item) {
            return String(date_item).padStart(2, "0")
        }
    }
}