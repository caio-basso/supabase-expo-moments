import React, { useState } from 'react'
import { Alert, View, TextInput, Text, } from 'react-native'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View className="w-80 bg-neutral-100 py-16 px-4 rounded-lg shadow-black shadow-2xl">
      <View>
        <Text className="text-5xl font-extralight text-purple-800 self-center mb-7">
          Moments
        </Text>
      </View>
      <View>
        <Text className="text-purple-800 text-lg">
          Email
        </Text>
        <TextInput
          label="Email"
          onChangeText={(text) => setEmail(text)}
          className="mb-3 rounded-xl h-10 placeholder:pl-3 placeholder:text-neutral-300 border-2 border-neutral-300 focus:border-purple-800 text-black"
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text className="text-purple-800 text-lg">
          Senha
        </Text>
        <TextInput
          label="Senha"
          onChangeText={(text) => setPassword(text)}
          className="rounded-xl h-10 placeholder:pl-3 placeholder:text-neutral-300 border-2 border-neutral-300 focus:border-purple-800 text-black"
          value={password}
          secureTextEntry={true}
          placeholder="Senha"
          keyboardType="default"
        />
      </View>
      <View className="flex flex-row items-center justify-between mt-4">
        <View className="bg-purple-800 w-32 h-7 rounded-lg flex justify-center">
            <Text className="text-neutral-200 text-center" onPress={() => signUpWithEmail()}>Registrar</Text>
        </View>
        <View className="bg-purple-800 w-32 h-7 rounded-lg flex justify-center">
            <Text className="text-neutral-200 text-center" onPress={() => signInWithEmail()}>Login</Text>
        </View>
      </View>
    </View>
  )
}