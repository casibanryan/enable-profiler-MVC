class Form_Validation {
    constructor() {
        this.error_messages = {};
        this.valid_form = true;
    }

    /**
     * If the parameter is empty, then add a custom error message to the error_messages object,
     * otherwise return true
     * @param param - The name of the parameter you want to validate.
     * @param custom_error_message - This is the custom error message you want to display if the
     * parameter is empty.
     * @returns The return value of the function is the value of the valid_form variable.
     */
    required(param, custom_error_message) {
        if(param.length == 0) {
            if(custom_error_message) {
                this.error_messages[`${param}_required`] = custom_error_message;
            } else {
                this.error_messages[`${param}_required`] = `${param} is required`;
            }
            return this.valid_form = false;
        } else {
            return this.valid_form = true;
        }
    }

   /**
    * If the two parameters are not equal, then the function will return false and add a custom error
    * message to the error_messages object
    * @param label - The label of the field you want to validate.
    * @param param1 - The first parameter to compare
    * @param param2 - The value to compare with param1
    * @param custom_error_message - This is the custom error message you want to display if the
    * validation fails.
    * @returns The return value of the function is the value of the valid_form property.
    */
    matches(label, param1, param2, custom_error_message) {
        if(param1 !== param2) {
            if(custom_error_message) {
                this.error_messages[`${label.toLowerCase()}_not_match`] = custom_error_message;
            } else {
                this.error_messages[`${label.toLowerCase()}_not_match`] = `${label} doesn't match`;
            }
            return this.valid_form = false;
        } else {
            return this.valid_form = true;
        }
    }
}

module.exports = new Form_Validation();