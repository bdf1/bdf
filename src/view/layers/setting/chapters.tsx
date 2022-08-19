import { bgmPlayer } from "@/modules/audio/bgm";
import { sePlayer } from "@/modules/audio/se";
import { Component, defineComponent, Ref } from "vue";
import AudioController from "./base/AudioController.vue";
import ViewScale from "./base/ViewScale.vue";
import Switch from "./base/Switch.vue";
import Slider from "./base/Slider.vue";

export const chapters: [ string, [ string, Component, string? ][] ][] = [
    [ "音频设置", [
        [ "音效音量", defineComponent(({ focused }: { focused: boolean }) => {
            return () => (
                <AudioController player={ sePlayer } focused={ focused }></AudioController>
            );
        }) ],
        [ "音乐音量", defineComponent(({ focused }: { focused: boolean }) => {
            return () => (
                <AudioController player={ bgmPlayer } focused={ focused }></AudioController>
            );
        }) ],
    ] ],
    [ "显示设置", [
        [ "画面缩放", ViewScale ],
    ] ],
    [ "显伤设置", [
        [ "定点怪显", defineComponent(({ focused }: { focused: boolean }) => {
            return () => (
                <Switch config={ 1 } focused={ focused }></Switch>
            );
        }) ],
        [ "怪物显伤", defineComponent(({ focused }: { focused: boolean }) => {
            return () => (
                <Switch config={ 1 } focused={ focused }></Switch>
            );
        }) ],
        [ "临界显伤", defineComponent(({ focused }: { focused: boolean }) => {
            return () => (
                <Switch config="critical" focused={ focused }></Switch>
            );
        }) ],
        [ "领域显伤", defineComponent(({ focused }: { focused: boolean }) => {
            return () => (
                <Switch config={ 1 } focused={ focused }></Switch>
            );
        }) ],
        [ "领域模式", defineComponent(({ focused }: { focused: boolean }) => {
            return () => (
                <Switch config={ 1 } focused={ focused }></Switch>
            );
        }) ],
    ] ],
    [ "辅助功能", [
        [ "移动速度", defineComponent(({ focused }: { focused: boolean }) => {
            return () => (
                <Slider config={ 1 } focused={ focused }></Slider>
            );
        }) ],
        [ "转场时间", defineComponent(({ focused }: { focused: boolean }) => {
            return () => (
                <Slider config={ 1 } focused={ focused }></Slider>
            );
        }) ],
        [ "血瓶绕路", defineComponent(({ focused }: { focused: boolean }) => {
            return () => (
                <Switch config="" focused={ focused }></Switch>
            );
        }) ],
        [ "单击瞬移", defineComponent(({ focused }: { focused: boolean }) => {
            return () => (
                <Switch config={ 1 } focused={ focused }></Switch>
            );
        }) ],
        [ "左手模式", defineComponent(({ focused }: { focused: boolean }) => {
            return () => (
                <Switch config="leftHandPrefer" focused={ focused }></Switch>
            );
        }) ],
    ] ],
];