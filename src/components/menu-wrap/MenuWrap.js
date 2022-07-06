import React, {useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Text} from 'react-native';
import colors from '../../libs/colors';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import TextWrap from '../text-wrap/TextWrap';
import {screenWidth} from '../../services/utils';

export default function MenuWrap({
  style,
  label,
  data,
  noData = true,
  value,
  onChange,
}) {
  const [visible, setVisible] = useState(false);
  // const sd = data ? data[data.findIndex(x => x.categoryId === value)] : null;

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  // console.log(data);
  return (
    // <View>
    //   <Menu
    //     visible={visible}
    //     anchor={
    //       <TouchableWithoutFeedback onPress={showMenu}>
    //         <View style={[styles.root, style]}>
    //           <TextWrap
    //             style={[
    //               styles.label,
    //               {color: Boolean(sd) ? colors.black : colors.placeholder},
    //             ]}>
    //             {/* {sd ? sd.name : label || '선택'} */}
    //             asdf
    //           </TextWrap>
    //           <View style={styles.button}></View>
    //         </View>
    //       </TouchableWithoutFeedback>
    //     }>
    //     {/* {data &&
    //     (noData ? [{label: '선택안함', value: ''}, ...data] : data).map(
    //       (x, i) => {
    //         return (
    //           <MenuItem
    //             key={i.toString()}
    //             onPress={() => {
    //               hideMenu();
    //               onChange(x.categoryId);
    //             }}>
    //             <TextWrap black>{x.name}</TextWrap>
    //           </MenuItem>
    //         );
    //       },
    //     )} */}
    //     <MenuItem
    //       onPress={() => {
    //         hideMenu();
    //         // onChange(x.categoryId);
    //       }}>
    //       <TextWrap black>dadsaf</TextWrap>
    //     </MenuItem>
    //     <MenuItem
    //       onPress={() => {
    //         hideMenu();
    //         // onChange(x.categoryId);
    //       }}>
    //       <TextWrap black>222222</TextWrap>
    //     </MenuItem>
    //   </Menu>
    // </View>
    <View
      style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <Menu
        visible={visible}
        anchor={<Text onPress={showMenu}>Show menu</Text>}
        onRequestClose={hideMenu}>
        <MenuItem onPress={hideMenu}>Menu item 1</MenuItem>
        <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
        <MenuItem disabled>Disabled item</MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>Menu item 4</MenuItem>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: 20,
    width: screenWidth / 2 - 25,
  },
  label: {
    fontSize: 13,
    color: colors.black,
    lineHeight: 15,
  },
  down: {
    width: 13,
    height: 7,
    resizeMode: 'contain',
  },
  // button: {
  //   paddingHorizontal: 10,
  //   alignItems: 'flex-end',
  //   justifyContent: 'center',
  //   paddingVertical: 6,
  // },
});
