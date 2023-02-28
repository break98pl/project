import React, { useEffect, useState } from "react";
import { FlatList, View, Text, RefreshControl, Alert } from "react-native";
import { getFeedApi } from "../api";
import Header from "../components/Header";
import ItemNews from "../components/ItemNews";
import { STORAGE_KEY } from "../utils/constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () =>{
  const [xmlData, setXmlData] = useState({});
  const [listIdSelected, setListIdSelected] = useState([])

  console.log({listIdSelected});

  const getNews = async() =>{
    try {
      const response = await getFeedApi();
      setXmlData(response)
    } catch (error) {
      Alert.alert('Notification', error.toString())
    }
  }

  const getIdReadedFromStorage = async() =>{
    const data = await AsyncStorage.getItem(STORAGE_KEY.listSelect);
    setListIdSelected(JSON.parse(data))
  }

  const handlePressItem = (id) => async() =>{
    const newList = [
      ...listIdSelected,
      id
    ]
    setListIdSelected(newList)
  }

  const _renderItem = ({item}) =>{
    const isReaded = listIdSelected.includes(item.id)
    return <ItemNews data={item} onPressItem={handlePressItem} isReaded={isReaded} />
  }

  const saveToStorage = async(list) =>{
    try {
      await AsyncStorage.setItem(STORAGE_KEY.listSelect, JSON.stringify(list))
    } catch (e) {
      // saving error
    }
  }

  useEffect(() =>{
    saveToStorage(listIdSelected)
  }, [listIdSelected])

  useEffect(() =>{
    getNews();
    getIdReadedFromStorage()
  }, [])

  return (
    <>
      <FlatList
        refreshControl={<RefreshControl refreshing={false} onRefresh={getNews} />}
        ListHeaderComponent={
          <Header title={xmlData?.description} image={xmlData?.image?.url} />
        }
        data={xmlData?.items}
        renderItem={_renderItem}
      />
    </>
  );
}

export default Home;