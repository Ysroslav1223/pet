import * as z from 'zod'

export const LoginScheme = z.object({
  login:z.string().min(3,'Логин должен содержать минимум 3 символа').max(30,'Слишком длянный логин'),
  password:z.string().min(6,'Пароль должен содержать минимум 6 символов')
})

export type LoginFormData = z.infer<typeof LoginScheme>

export const validateLogin =(data:unknown)=>{
    const result = LoginScheme.safeParse(data)

    if(result.success){
        return{success:true,data:result.data}
    }
    const formatedErrors:Record<string,string>={}

    result.error.errors.forEach(err=>{
        const field = err.path[0]
        if(typeof field ==='string'){
            formatedErrors[field]=err.message
        }
    })
    return {success:false,errors:formatedErrors}
}


