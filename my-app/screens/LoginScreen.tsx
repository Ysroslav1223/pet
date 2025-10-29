
import { StyleSheet, Text, View,TextInput,Button, TouchableWithoutFeedback, 
  Keyboard } from 'react-native';
import {LoginScheme,LoginFormData}from '../validation/auth.scheme'
import {zodResolver}from '@hookform/resolvers/zod'
import { useForm,Controller } from 'react-hook-form';
import{useFetch}from '../hooks/useFetch'
import { METHODS } from '../hooks/useFetch';

export const LoginScreen=()=>{

const onPress = ():void=>Keyboard.dismiss()

const{control,handleSubmit,formState:{errors,isSubmitting}}=useForm<LoginFormData>({
    resolver:zodResolver(LoginScheme),
    mode:'onSubmit'
})

const { request, loading, error } = useFetch()

const onSubmit =async(data:LoginFormData)=>{
    const result = await request<{ token: string }>({
    url: "https://example.com/api/login",
    method: METHODS.post,
    data,
  })
}
    return( 
    <TouchableWithoutFeedback onPress={onPress} accessible={false}>
        <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.textContent}>
                <Text style={styles.logo}>Welcome Back!</Text>
                <Text style={styles.text}>Please sing in to your account</Text>
              </View>
            <View style={styles.from}>
              <Controller
                control={control}
                name="login"
                render={({ field: { onChange, value } }) => (
                <TextInput
                style={styles.input}
                placeholder="login"
                placeholderTextColor="#5c5a61"
                value={value}
                onChangeText={onChange}/>)}/>
                 <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="password"
                placeholderTextColor="#5c5a61"
                secureTextEntry
                value={value}
                onChangeText={onChange}/>)}/>
                <Text style={styles.text}>Forgot Password?</Text>
              </View>
               <Button title={isSubmitting ? 'Loading...' : 'Войти'} 
                onPress={handleSubmit(onSubmit)} />
            </View> 
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding:20,
    justifyContent: 'center',
    backgroundColor:'#1b1a1c'
  },
  textStyle:{color:'blue'},
  content:{
    alignItems:'center',
    gap:50,
  },
  from:{
    alignSelf:'stretch',
    textAlign:'center',
    justifyContent:'center',
    gap:16,
    padding:20,
  },
  textContent:{
    justifyContent:'center',
    alignItems:'center',
    gap:10
  },
  logo:{
    color:'#fff',
    fontWeight:700,
    fontSize:20
  },
  text:{
    color:'#5c5a61',
    textAlign:'right'
    
  },
  input:{
    backgroundColor:'#29282b',
    color:'#fff',
    borderRadius:15,
    fontSize:16,
    height:60,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
 
});

