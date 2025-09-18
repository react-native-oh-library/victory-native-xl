/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
 * Use of this source code is governed by a MIT license that can be
 * found in the LICENSE file.
 */
import * as React from "react";
import { useState } from "react";
import { View, Text } from "react-native";
import { CartesianChart, Line } from "victory-native";

function randomNumber() {
  return Math.floor(Math.random() * 26) + 12;
}
const DATA = (numberPoints = 13) =>
  Array.from({ length: numberPoints }, (_, index) => ({
    day: index + 1,
    highTmp: randomNumber(),
  }));

function LineChartExample() {
  const [data, setData] = useState(DATA(13));
  return <View style={{ height: 300 }}>
    <Text>Line Chart</Text>
    <CartesianChart
      data={data}
      xKey="day"
      yKeys={["highTmp"]}
    >
      {({ points }) => (
        <>
          <Line
            points={points.highTmp}
            color="red"
            strokeWidth={3}
            curveType="catmullRom"
            animate={{ type: "timing", duration: 300 }}
            connectMissingData={true}
          />
        </>
      )}
    </CartesianChart>
  </View>
}

//export default App
export default LineChartExample;