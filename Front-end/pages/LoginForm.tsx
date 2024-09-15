import React, { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { View } from "react-native";

import { supabase } from "../api/supabase";
import Auth from "../components/Auth";
import Account from "../components/Account";

function LoginForm() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </View>
  );
}

export default LoginForm;
