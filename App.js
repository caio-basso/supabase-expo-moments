import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import Account from './components/Account';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Moments from './components/Moments';

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <LinearGradient colors={['#a855f7', '#3c82f6']}>
      <View className="flex justify-center items-center h-full">
        {session && session.user ? 
          <>
            <Moments key={session.user.id} session={session} /> 
          </>
        : 
          <Auth />
        }
      </View>
    </LinearGradient>
  )
}