<template>
  <DeleteOutlined
    v-if="type == 'delete'"
    :style="{ fontSize: fontSize ? fontSize : '' }"
  />
  <FormOutlined
    v-if="type == 'form'"
    :style="{ fontSize: fontSize ? fontSize : '' }"
  />
  <CameraOutlined
    v-if="type == 'camera'"
    :style="{ fontSize: fontSize ? fontSize : '' }"
  />
  <LoadingOutlined
    v-if="type == 'loading'"
    :style="{ fontSize: fontSize ? fontSize : '' }"
  />
  <AppstoreOutlined
    v-if="type == 'appstore'"
    :style="{ fontSize: fontSize ? fontSize : '' }"
  />
  <ApartmentOutlined
    v-if="type == 'apartment'"
    :style="{ fontSize: fontSize ? fontSize : '' }"
  />
  <CaretLeftOutlined
    v-if="type == 'leftArrow'"
    :style="{ fontSize: fontSize ? fontSize : '' }"
  />
  <CaretRightOutlined
    v-if="type == 'rightArrow'"
    :style="{ fontSize: fontSize ? fontSize : '' }"
  />
  <UploadOutlined
    v-if="type == 'upload'"
    :style="{ fontSize: fontSize ? fontSize : '' }"
  />
  <HomeOutlined
    v-if="type == 'home'"
    :style="{ fontSize: fontSize ? fontSize : '' }"
  />
  <MenuUnfoldOutlined
    v-if="type == 'menuUnfold'"
    :style="{ fontSize: fontSize ? fontSize : '' }"
  />
  <MenuFoldOutlined
    v-if="type == 'menuFold'"
    :style="{ fontSize: fontSize ? fontSize : '' }"
  />
  <LogoutOutlined
    v-if="type == 'logout'"
    :style="{ fontSize: fontSize ? fontSize : '' }"
  />
</template>

<script>
import {
  DeleteOutlined,
  FormOutlined,
  CameraOutlined,
  LoadingOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  UploadOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
export default {
  components: {
    DeleteOutlined,
    FormOutlined,
    CameraOutlined,
    LoadingOutlined,
    AppstoreOutlined,
    ApartmentOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
    UploadOutlined,
    HomeOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
  },
  props: ["type", "fontSize"],
};
</script>

<style></style>
