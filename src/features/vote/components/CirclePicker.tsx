import React, { useEffect, useState } from 'react';
import {
    StyleSheet
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

function CirclePicker({circles, selectedCircle, onChange}) {
    const [open, setOpen] = useState(false);
    console.log("selectedCircle:", selectedCircle);
    const [value, setValue] = selectedCircle != null ? useState(Object.values(circles).map(circle => circle["circle/id"]).indexOf(selectedCircle["circle/id"])) : useState(0);
    useEffect(() => {
        if (selectedCircle != null) {
            setValue(Object.values(circles).map(circle => circle["circle/id"]).indexOf(selectedCircle["circle/id"]));
        }
    }, [selectedCircle])
    const [items, setItems] = useState(
        Object.values(circles).map((circle: any, idx: number) => {return {label: circle["circle/name"], value: idx}})
    );
    //DropDownPicker.addTheme("QuestionPackPickerTheme", "require("./QuestionPackPickerTheme")");
    DropDownPicker.setTheme("DARK"); 

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            placeholder="Choose pack"
            zIndex={1000}
            onChangeValue={onChange}
            style={
                {
                    backgroundColor: '#16161A',
                    marginVertical: 20,
                    width: 200,
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderWidth: 0,
                }
            }
            dropDownContainerStyle={
                {
                    backgroundColor: '#16161A', 
                    marginVertical: 20, 
                    width: 200, 
                    alignSelf: 'center',
                    borderWidth: 0,
                }
            }
            labelStyle={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Montserrat-SemiBold'}}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
    );
}

export default CirclePicker;