import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { CheckBox } from "react-native-elements";

const SelectMultiple = (props) => {
    const [optionsSelect, setOptionsSelect] = useState(props.options);

    useEffect(() => {
        preprocessOption();
    }, []);

    preprocessOption = () => {
        const aux = [];
        props.options.forEach(e => {
            const op = { label: e.label, value: e.value, checked: false, nomeCategoria: e.nomeCategoria };
            aux.push(op);
        });

        setOptionsSelect(aux);
    }

    onSelected = (data, item) => {
        props.onSelected(optionsSelect, item);
    }

    return (
        <View>
            {optionsSelect.length > 0 && <View>
                {optionsSelect.map(e => {
                    return (
                    <CheckBox
                        key={e.value}
                        title={e.label}
                        checked={e.checked}
                        onPress={() => {
                            const c = [];
                            optionsSelect.forEach(el => {
                                if (e !== el) {
                                    c.push(el);
                                } else {
                                    e.checked = !e.checked;
                                    c.push(e);
                                }
                            });

                            setOptionsSelect(c);
                            onSelected(optionsSelect, e);
                        }}
                      />)
                })}
            </View>
            }
        </View>
    );
}

export default SelectMultiple;