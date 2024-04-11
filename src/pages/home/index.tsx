import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
import { useEffect } from "react";
export default function Index() {
  useLoad(() => {});
  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = () => {
    const res = Taro.request({ url: "http://localhost:3000/user" });
    return res;
  };

  return (
    <View className="index">
      <Text>Hello world!</Text>
    </View>
  );
}
