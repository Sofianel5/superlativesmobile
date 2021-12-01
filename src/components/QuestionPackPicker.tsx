import React, { useState } from 'react';
import {
    StyleSheet
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

function QuestionPackPicker({questionPacks, onChange}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(
        questionPacks.map((questionPack: any, idx: number) => {return {label: questionPack.name, value: idx}})
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
            }
        }
        dropDownContainerStyle={{backgroundColor: '#16161A', marginVertical: 20}}
        labelStyle={{color: 'white', fontSize: 17, fontFamily: 'Montserrat-SemiBold'}}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        />
    );
}

export default QuestionPackPicker;