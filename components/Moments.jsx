import { FlatList, Image, View } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from '../lib/supabase';
import { Text } from "react-native";
import { v4 as uuidv4 } from "uuid";
import { PUBLIC_SUPABASE_DOMAIN_URL } from '@env';

export default function Moments({ session }) {
    const [images, setImages] = useState([]);

    async function getImages() {
        const { data, error } = await supabase
        .storage
        .from('images')
        .list(session?.user?.id + "/", {
            limit: 100,
            offset: 0,
            sortBy: { column: "created_at", order: "desc"}
        });

        if(data !== null) {
            setImages(data);
        } else {
            console.log(error);
        };
    };

    useEffect(() => {
        if(session?.user) {
            getImages()
        }
    }, [session?.user])

    async function uploadImage(e) {
        let image = e.target.files[0];

        const { data, error } = await supabase
        .storage
        .from('images')
        .upload(session?.user.id + "/" + uuidv4(), image);

        if(data) {
            getImages();
        } else {
            console.log(error);
        };
    };

    return (
        <>
            <FlatList data={images} className="mt-24" renderItem={imageData => {
                return (
                    <View key={imageData.item.name} className="mb-5">
                        <Image
                            className="w-80 h-96 rounded-2xl shadow-2xl border-neutral-400 border-2"
                            source={{
                            uri: PUBLIC_SUPABASE_DOMAIN_URL + session.user.id + "/" + imageData.item.name,
                            }}
                        />
                        <View className="absolute h-20 opacity-25 bg-neutral-200"></View>
                    </View>
                )
            }}/>
        </>
    )

}