function addNewAddress() {
    const elButtonAddNew = $("#AddressNewButton"),
        elFormAddNew = $("#address_form_new"),
        elFormWrap = $("#AddressNewForm"),
        elButtonCancel = $("#AddNewCancel");

    $(this).locationForm({
        locale: shopLocale,
        postalCode: {
            parentClass: "AddressPostCodeNew",
            data: postalCodeShop,
            id: "AddressZipNew",
            class: "form-control",
            name: "address[zip]",
        },
        state: {
            parentClass: "AddressProvinceCodeNew",
            data: stateShop,
            name: "address[province_code_select]",
            id: "AddressProvinceCodeNew",
        },
        city: {
            parentClass: "AddressDistrictCodeNew",
            data: cityShop,
            name: "address[address2]",
            id: "AddressDistrictCodeNew",
        },
    });

    // Show and Hide form add new

    elButtonAddNew.on("click", function () {
        elButtonAddNew.addClass("hide");
        elFormWrap.removeClass("hide");
    });

    elButtonCancel.on("click", function () {
        elButtonAddNew.removeClass("hide");
        elFormWrap.addClass("hide");
    });

    // Validate and submit
    //
    elFormAddNew.validate({
        rules: {
            "address[first_name]": {
                required: true,
                firstNameMaxLengthCustom: true,
                restrictDelimiter: function () {
                    return $('[name="address[address1]"]').val();
                },
            },
            "address[last_name]": {
                required: true,
                lastNameMaxLengthCustom: true,
                restrictDelimiter: function () {
                    return $('[name="address[address1]"]').val();
                },
            },
            "address[address1]": {
                required: true,
                addressMaxLengthCustom: true,
                restrictDelimiter: function () {
                    return $('[name="address[address1]"]').val();
                },
            },
            "address[phone]": {
                required: true,
                telephoneCustom: true,
            },
            "address[zip]": {
                required: true,
                validPostalCodeCustom: function () {
                    return $('[name="address[zip]"]').val();
                },
            },
        },
        errorPlacement: function (error, element) {
            if (
                element.hasClass("select2-hidden-accessible") &&
                element.next(".select2-container").length
            ) {
                error.insertAfter(element.next(".select2-container"));
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            elFormAddNew.find('.btn[type="submit"] .loader').show();
            const textProvince = $("#AddressProvinceCodeNew")
                .find("option:selected")
                .text(),
                textDistrict = $("#AddressDistrictCodeNew")
                    .find("option:selected")
                    .text(),
                provinceCode = $("#AddressProvinceCodeNew")
                    .find(':selected')
                    .attr('data-code');
            $("#AddressProvinceNew").val(textProvince);
            $("#AddressDistrictNew").val(textDistrict);
            $("#AddressProvinceCodeNewInput").val(provinceCode);
            $.ajax({
                url: $(form).attr('action'),
                type: $(form).attr('method'),
                data: $(form).serialize(),
                success: function(response) {
                    var ev = {};
                    ev.eventInfo={
                        'type':ctConstants.trackEvent,
                        'eventAction': ctConstants.forms,
                        'eventLabel' : `${$(form).attr('id')} - Form Successfully Submitted - ${$(form).serialize()}`,
                        'eventValue' :1
                    };
                    ev.category ={'primaryCategory':ctConstants.custom};
                    ev.subcategory = 'Lead';
                    digitalData.event.push(ev);
                    elFormAddNew[0].submit();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            })

        },
    });
}

function handleSelectChange() {
    // Update input hide when change select
    $(document).on("change", ".select2_wrap select", function () {
        let parentEl = $(this).parents(".form-group"),
            inputHidden = parentEl.find("input[type=hidden]"),
            valueSl = $(this).find("option:selected").data('value');
        inputHidden.val(valueSl);
        $(this).valid();
    });
}

function editAddress() {
    let itemAddress = $(".address-box");

    $(".address-edit-toggle").on("click", function () {
        let formId = $(this).data("form-id");
        let $editAddress = $("#EditAddress_" + formId);

        // Toggle form
        $editAddress.toggleClass("hide");
        if ($(this).data("edit_header")) {
            $(this).addClass("hide");
        } else {
            $(".address-header .address-edit-toggle").removeClass("hide");
        }

        // Toggle class item edit support mobile
        $(this).parents(".address-item").toggleClass("active");
    });

    // Update location form
    if (itemAddress.length > 0) {
        $(itemAddress).each(function (index) {
            let self = $(this),
                formEdit = self.find(".form__edit-address");
            let postalCodeClass = self
                .find(".AddressPostCodeEdit")
                .data("class_location"),
                postalCodeValue = self
                    .find(".AddressPostCodeEdit")
                    .data("value"),
                stateClass = self
                    .find(".AddressProvinceCodeEdit")
                    .data("class_location"),
                stateValue = self
                    .find(".AddressProvinceCodeEdit")
                    .data("value"),
                cityClass = self
                    .find(".AddressDistrictCodeEdit")
                    .data("class_location"),
                cityValue = self.find(".AddressDistrictCodeEdit").data("value");

            $(this).locationForm({
                locale: shopLocale,
                postalCode: {
                    parentClass: postalCodeClass,
                    data: postalCodeShop,
                    class: "form-control",
                    name: "address[zip]",
                    id: postalCodeClass,
                    defaultValue: postalCodeValue,
                },
                state: {
                    parentClass: stateClass,
                    data: stateShop,
                    name: "address[province_code_select]",
                    id: stateClass,
                    defaultValue: stateValue,
                },
                city: {
                    parentClass: cityClass,
                    data: cityShop,
                    name: "address[address2]",
                    id: cityClass,
                    defaultValue: cityValue,
                },
            });
            // Validate and submit
            //
            formEdit.validate({
                rules: {
                    "address[first_name]": {
                        required: true,
                        firstNameMaxLengthCustom: true,
                        restrictDelimiter: function () {
                            return $('[name="address[first_name]"]').val();
                        },
                    },
                    "address[last_name]": {
                        required: true,
                        lastNameMaxLengthCustom: true,
                        restrictDelimiter: function () {
                            return $('[name="address[last_name]"]').val();
                        },
                    },
                    "address[address1]": {
                        required: true,
                        addressMaxLengthCustom: true,
                        restrictDelimiter: function () {
                            return $('[name="address[address1]"]').val();
                        },
                    },
                    "address[zip]": {
                        required: true,
                        validPostalCodeCustom: function () {
                            return $('[name="address[zip]"]').val();
                        },
                    },
                    "address[phone]": {
                        required: true,
                        telephoneCustom: true,
                    },
                },
                submitHandler: function(form) {
                    formEdit.find('.btn[type="submit"] .loader').show();
                    // Update Address ProvinceCode
                    const elProvinceCode = $(form).find("select[name='address[province_code_select]']"),
                        provinceCode = elProvinceCode.find(':selected').attr('data-code');
                    if (provinceCode) {
                        $('[name="address[province_code]"]').val(provinceCode);
                    }
                    $.ajax({
                        url: $(form).attr('action'),
                        type: $(form).attr('method'),
                        data: $(form).serialize(),
                        success: function(response) {
                            var ev = {};
                            ev.eventInfo={
                                'type':ctConstants.trackEvent,
                                'eventAction': ctConstants.forms,
                                'eventLabel' : `${$(form).attr('id')} - Form Successfully Submitted - ${$(form).serialize()}`,
                                'eventValue' :1
                            };
                            ev.category ={'primaryCategory':ctConstants.custom};
                            ev.subcategory = 'Lead';
                            digitalData.event.push(ev);
                            location.reload();
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            console.log(xhr.status);
                            console.log(thrownError);
                        }
                    })

                },
                errorPlacement: function (error, element) {
                    if (
                        element.hasClass("select2-hidden-accessible") &&
                        element.next(".select2-container").length
                    ) {
                        error.insertAfter(element.next(".select2-container"));
                    } else {
                        error.insertAfter(element);
                    }
                },
            });
        });
    }
}

function deleteAddress() {
    // Delete address
    $(".address-delete").on("click", function () {
        var $el = $(this);
        var target = $el.data("target");

        // show pop-up confirm
        $('.delete-address__modal').show();

        // event delete.
        $('.delete-address__affirmative').click(function(){
            Shopify.postLink(target, {
                parameters: { _method: "delete" },
            });
            $('.delete-address__modal').hide();
        })
        // event cancel
        $('.delete-address__cancel').click(function(){
            $('.delete-address__modal').hide();
        })
    });
}

$(document).ready(function () {
    addNewAddress();

    editAddress();

    handleSelectChange();

    deleteAddress();
});
