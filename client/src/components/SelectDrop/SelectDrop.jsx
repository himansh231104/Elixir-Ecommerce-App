import React, { useState } from 'react';
import './SelectDrop.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ClickAwayListener } from '@mui/material';


const SelectDrop = (props, icon) => {

  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(props.placeholder);

  const [listData, setListData] = useState(props.data);
  const listData2 = props.data;

  const openSelect = () => {
    setIsOpenSelect(!isOpenSelect);
  }
  
  const closeSelect = (index, item) => {
    setSelectedIndex(index);
    setIsOpenSelect(false);
    setSelectedItem(item);
  }

  const filterList = (e) => {
    const keyword = e.target.value.toLowerCase();
    const list = listData2.filter((item)=>{
      return item.toLowerCase().includes(keyword);
    })
    const list2 = list.filter((item, index)=> list.indexOf(item)===index)
    setListData(list2);
  }



  return (
    <ClickAwayListener onClickAway={() => setIsOpenSelect(false)}>
      <div className="selectDropWrapper cursor d-flex align-items-center position-relative" onClick={openSelect}>
        {props.icon}
        <span className="openSelect">
          {selectedItem.length>12?selectedItem.substr(0,12)+'...': selectedItem} <KeyboardArrowDownIcon className="selectDropArrow" />
        </span>
        {isOpenSelect === true && (
          <div className="selectDrop">
            <div className="searchField">
              <input type="text" placeholder="Search here..." onChange={filterList} onClick={(e) => e.stopPropagation()}/>
            </div>
            <ul className="searchResults">
              <li
                key={0}
                onClick={() => closeSelect(0, props.placeholder)}
                className={`${selectedIndex === 0 ? "active" : ""}`}
              >
                {props.placeholder}
              </li>
              {listData.map((item, index) => {
                return (
                  <li
                    key={index + 1}
                    onClick={() => closeSelect(index + 1, item)}
                    className={`${selectedIndex === index + 1 ? "active" : ""}`}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}

export default SelectDrop;