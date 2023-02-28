import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { View, Text, TextInput } from 'react-native';

export default function Account({ session }) {
  const [email, setEmail] = useState(session?.user.email);
  const [password, setPassword] = useState('');

  async function updateUser() {
    if(email !== "" && email !== session?.user.email) {
        const { data, error } = await supabase.auth.updateUser({ email: email });
        setEmail(email);
    }

    if(password !== "") {
        const { data, error } = await supabase.auth.updateUser({ password: password });
        setPassword('');
    }

}

  return (
    <View className="w-80 bg-neutral-100 py-16 px-4 rounded-lg shadow-black shadow-2xl">
      <View>
        <Text className="text-5xl font-extralight text-purple-800 self-center mb-7">
          Editar Dados
        </Text>
      </View>
      <View>
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
            <Text className="text-neutral-200 text-center">Voltar</Text>
        </View>
        <View className="bg-purple-800 w-32 h-7 rounded-lg flex justify-center">
            <Text className="text-neutral-200 text-center" onPress={() => updateUser()}>Editar</Text>
        </View>
      </View>
      </View>
    </View>
  )
}
