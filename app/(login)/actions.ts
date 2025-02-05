'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { LoginRequest } from './login/LoginInterface'
import { RegisterRequest } from './register/RegisterInterface'
import { db } from '@/lib/db/db'
import { users } from '@/lib/db/schema'
import { eq } from "drizzle-orm";
import { UserData } from '@/types/UserTypes'
import { ResponseError } from '@/types/SettingsTypes'

export async function login(formData: LoginRequest) {
  const supabase = await createClient()

  const {data,  error} = await supabase.auth.signInWithPassword(formData)

  if (error || !data.user) {
	return { success: false, message: "Não foi possível logar, tente novamente" };
  }

	revalidatePath("/", "layout");
	redirect("/dashboard");
}

export async function signup(formData: RegisterRequest): Promise<ResponseError> {
	const supabase = await createClient();
  
	const { data, error } = await supabase.auth.signUp(formData);
  
	if (error || !data.user) {
	  return { success: false, message: "Não foi possível registrar, tente novamente" };
	}
  
	await db.insert(users).values({
		auth_id: data.user.id,
		email: formData.email,
		name: formData.name || null,
		createdAt: new Date(),
		updatedAt: new Date(),
	  }); 

	  return { success: true, message: "Registro realizado com sucesso. Confirme seu acesso pelo e-mail enviado." };
	}

  export async function logout() {
	const supabase = await createClient();
  
	const { error } = await supabase.auth.signOut();
  
	if (error) {
	  return { success: false, message: "Erro ao sair, tente novamente." };
	}
	
	revalidatePath("/", "layout");
	redirect("/login");
  }

  export async function getUserData(): Promise<UserData | ResponseError> {
	const supabase = await createClient();
  
	const { data: authData, error: authError } = await supabase.auth.getUser();
  
	if (authError || !authData?.user) {
	  return { success: false, message: "Usuário não autenticado" };
	}
  
	const userEmail = authData.user.email;
	if (!userEmail) {
	  return { success: false, message: "E-mail do usuário inválido" };
	}
  
	const user = await db.query.users.findFirst({
	  where: eq(users.email, userEmail),
	});
  
	if (!user) {
	  return { success: false, message: "Usuário não encontrado no banco de dados" };
	}
  
	return user as UserData;
  }  

  export async function updatePassword(currentPassword: string, newPassword: string) {
	const supabase = await createClient();
  
	const { data: authData, error: authError } = await supabase.auth.getUser();
	const userEmail = authData?.user?.email;
  
	if (authError || !userEmail) {
	  return { success: false, message: "Usuário não autenticado." };
	}
  
	const { error: signInError } = await supabase.auth.signInWithPassword({
	  email: userEmail,
	  password: currentPassword,
	});
  
	if (signInError) {
	  return { success: false, message: "Senha atual incorreta." };
	}
  
	const { error: updateError } = await supabase.auth.updateUser({
	  password: newPassword,
	});
  
	if (updateError) {
	  return { success: false, message: "Erro ao alterar senha. Tente novamente." };
	}
  
	return { success: true, message: "Senha alterada com sucesso!" };
  }
  
  
export async function updateEmail(currentEmail: string, newEmail: string) {
  const supabase = await createClient();

  const { error: updateError } = await supabase.auth.updateUser({
    email: newEmail,
  });

  if (updateError) {
    return { success: false, message: "Erro ao alterar e-mail" };
  }

  try {
    await db.update(users)
      .set({ email: newEmail })
      .where(eq(users.email, currentEmail));

    return { success: true, message: "E-mail atualizado com sucesso! Confirme seu novo e-mail" };
  } catch (dbError) {
    console.error("Erro ao atualizar e-mail no banco de dados:", dbError);
    return { success: false, message: "Erro ao atualizar e-mail" };
  }
}

export async function updateNotificationData(email: string, notificationData: boolean) {
  if (!email) {
    return { success: false, message: "Erro ao alterar configurações" };
  }

  try {
    await db.update(users)
      .set({
		notification: notificationData
	  })
      .where(eq(users.email, email));

    return { success: true, message: "Confiraucoes atualizadas com sucesso!" };
  } catch (dbError) {
    console.error("Erro ao atualizar e-mail no banco de dados:", dbError);
    return { success: false, message: "Erro ao atualizar e-mail" };
  }
}