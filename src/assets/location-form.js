$(function () {
    /**
     * Filter cities by the state, auto fill state and city by the postal code.
     *
     * @param options
     */
    $.fn.locationForm = function (options) {
        let settings = {
            locale: options.locale,
            postalCode: $.extend({
                parentClass: null,
                data: [],
                class: "zipCode",
                name: "zipCode",
                id: "",
                placeholder: "",
                required: true,
                defaultValue: "",
                label: theme.strings.locationForm.zipCode,
            }, options.postalCode),
            state: $.extend({
                parentClass: null,
                data: [],
                class: "state",
                name: "state",
                id: "",
                required: true,
                defaultValue: "",
                placeholder: theme.strings.locationForm.provincePlaceHolder,
                label: theme.strings.locationForm.province,
            }, options.state),
            city: $.extend({
                parentClass: null,
                data: [],
                class: "city",
                name: "city",
                id: "",
                required: false,
                placeholder: theme.strings.locationForm.districtPlaceHolder,
                label: theme.strings.locationForm.district,
            }, options.city)
        };

        let postalCodes;
        // let postalCodeHidden;
        let postalCodeInput;

        let states;
        let stateSelect;
        let stateDefaultOption;
        let filteredStates = [];

        let cities;
        let citySelect;
        let cityDefaultOption;
        let filteredCities = [];

        // Set state and city default options
        let setDefaultOptions = function () {
            stateDefaultOption = new Option(settings.state.placeholder, '');
            cityDefaultOption = new Option(settings.city.placeholder, '');
        }

        // Sort the objects by locale name
        let sortByLocale = function (objects) {
            return objects.sort(function (a, b) {
                if (settings.locale === 'th') {
                    return a.th_name.localeCompare(b.th_name);
                } else {
                    return a.en_name.localeCompare(b.en_name);
                }
            });
        }

        // Append option to the element
        let appendStateOption = function (select, option) {
            let opt = document.createElement("option");
            if (settings.locale === 'th') {
                opt.text = option.th_name;
            } else {
                opt.text = option.en_name;
            }
            opt.value = option.id;
            opt.setAttribute("data-value", option.en_name);
            opt.setAttribute("data-code", option.code);
            select.append(opt);
        }

        let appendCityOption = function (select, option) {
            let opt = document.createElement("option");
            if (settings.locale === 'th') {
                opt.text = option.th_name;
                opt.setAttribute("data-value", option.th_name);
            } else {
                opt.text = option.en_name;
                opt.setAttribute("data-value", option.en_name);
            }
            opt.value = option.id;
            opt.setAttribute("data-en", option.en_name);
            opt.setAttribute("data-th", option.th_name);
            select.append(opt);

        }

        // Load state options
        let loadStateOptions = function (state = undefined) {
            stateSelect.find('option').remove().end().append(stateDefaultOption).val('');

            if (filteredStates.length === 0) {
                $.each(states, function (key, value) {
                    appendStateOption(stateSelect, value);
                });
            } else {
                $.each(states.filter(state => $.inArray(state, filteredStates) !== -1), function (key, value) {
                    appendStateOption(stateSelect, value);
                });
            }

            if (state !== undefined) {
                stateSelect.val(state.id);
                stateSelect.trigger('change');
                stateSelect.removeClass('error');
            }
        };

        // Load city options
        let loadCityOptions = function (stateId = undefined, city = undefined) {
            citySelect.find('option').remove().end().append(cityDefaultOption).val('');

            if (filteredCities.length === 0) {
                if (stateId !== undefined) {
                    $.each(cities.filter(c => c.state_id == stateId), function (key, value) {
                        appendCityOption(citySelect, value);
                    });
                }
            } else {
                if (city !== undefined) {
                    $.each(cities.filter(c => (c.state_id == city.state_id) && ($.inArray(c, filteredCities) !== -1)), function (key, value) {
                        appendCityOption(citySelect, value);
                    });

                    citySelect.val(city.id);
                    citySelect.trigger('change');
                    citySelect.removeClass('error');
                } else if (stateId !== undefined) {
                    $.each(cities.filter(c => (c.state_id == stateId) && ($.inArray(c, filteredCities) !== -1)), function (key, value) {
                        appendCityOption(citySelect, value);
                    });

                    citySelect.val(citySelect.children().eq(1).val());
                    citySelect.trigger('change');
                    citySelect.removeClass('error');
                }
            }
        };

        // Prepare postal codes
        let preparePostalCodes = function () {
            postalCodes = settings.postalCode.data;

            $("." + settings.postalCode.parentClass).append(
                "<label for=\"#\">"+ settings.postalCode.label +`${settings.postalCode.required ? "*" : ""}</label>` +
                // "<input name=\"" + settings.postalCode.name + "\" type=\"hidden\"/>\n" +
                "<input name=\"" + settings.postalCode.name + "\" class=\"" + settings.postalCode.class + "\" id=\"" + settings.postalCode.id + "\" value=\"" + settings.postalCode.defaultValue + "\" placeholder=\"" + settings.postalCode.placeholder + "\" type=\"text\" maxlength=\"10\"/>"
            );

            // postalCodeHidden = $("." + settings.postalCode.parentClass + " > input[type=hidden]");
            postalCodeInput = $("." + settings.postalCode.parentClass + " > input[type=text]");
        }

        // Prepare states
        let prepareStates = function () {
            states = sortByLocale(settings.state.data);

            $("." + settings.state.parentClass).append(
                "<label for=\"#\">"+ settings.state.label+"*</label>" +
                "<select class=\"" + settings.state.class + "\" id=\"" + settings.state.id + "\" name=\"" + settings.state.name + "\"" + (settings.state.required ? " required=\"required\"" : "") + "></select>"
            );

            stateSelect = $("." + settings.state.parentClass + " > select");
            stateSelect.select2({
                allowClear: true,
                placeholder: settings.state.placeholder
            });
            loadStateOptions();

        }

        // Prepare cities
        let prepareCities = function () {
            cities = sortByLocale(settings.city.data);

            $("." + settings.city.parentClass).append(
                "<label for=\"#\">"+ settings.city.label +`${settings.city.required ? "*" : ""}</label>` +
                "<select class=\"" + settings.city.class + "\" id=\"" + settings.city.id + "\" name=\"" + settings.city.name + "\"" + "></select>"
            );

            citySelect = $("." + settings.city.parentClass + " > select");
            citySelect.select2({
                minimumResultsForSearch: 'Infinity',
                // placeholder: settings.city.placeholder,
            });

            loadCityOptions();

        }

        // Prepare HTML and JS objects
        let prepare = function () {
            setDefaultOptions();

            if (settings.postalCode.parentClass) {
                preparePostalCodes();
            }

            if (settings.state.parentClass) {
                prepareStates();
            }

            if (settings.city.parentClass) {
                prepareCities();
            }

        }

        return this.each(function () {
            prepare();

            if (settings.state.parentClass && settings.city.parentClass) {
                // Filter cities by the state
                stateSelect.on('select2:select', function (e) {
                    loadCityOptions($(this).val());
                });


                // init default value
                if (settings.state.defaultValue) {
                    if (settings.locale === 'th') {
                        const province = settings.state.data.find(item => item.code === settings.state.defaultValue).en_name;
                        const wrapper = document.querySelector('.' + settings.state.parentClass).parentElement.parentElement;
                        const hiddenInput = wrapper.querySelector('input.AddressProvinceEdit');
                        hiddenInput.value = province;
                    }
                    stateSelect.find('option[data-code="' + settings.state.defaultValue + '"]').prop("selected", true);
                    stateSelect.trigger('change');
                    let valueSelect = stateSelect.val();
                    loadCityOptions(valueSelect);

                    if (settings.city.defaultValue) {
                        const city = (settings.city.data.find(item => item.th_name === settings.city.defaultValue || item.en_name === settings.city.defaultValue));
                        citySelect.find('option[value="' + city.id + '"]').prop("selected", true);
                        citySelect.trigger('change');
                    }
                }

                if (settings.postalCode.parentClass) {
                    // Auto fill state and city by the postal code
                    postalCodeInput.keyup(function () {
                        // postalCodeHidden.val(this.value);

                        filteredStates = [];
                        filteredCities = [];

                        $.each(postalCodes.filter(postalCode => postalCode.relative_code == this.value), function (postalCodeKey, postalCode) {
                            $.each(cities.filter(city => city.id == postalCode.city_id), function (cityKey, city) {
                                $.each(states.filter(state => state.id == city.state_id), function (stateKey, state) {
                                    filteredStates.push(state);
                                });

                                filteredCities.push(city);
                            });
                        });

                        filteredStates = sortByLocale(filteredStates);
                        filteredCities = sortByLocale(filteredCities);
                        // Disable select State and select City if zipcode value is invalid
                        if ((filteredStates.length < 1 || filteredCities.length < 1) && this.value !== '') {
                            stateSelect.prop('disabled', true);
                            citySelect.prop('disabled', true);
                        } else {
                            stateSelect.removeAttr('disabled');
                            citySelect.removeAttr('disabled');
                        }
                        loadStateOptions(filteredStates[0]);
                        loadCityOptions(undefined, filteredCities[0]);
                    });
                }
            }
        });
    }
});
