// App.js (cole inteiro no snack.expo.dev)
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
  Image,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/*
  SkillUpPlus2030 - Single-file example for Expo Snack
  - Stack + Tabs navigation
  - Login with AsyncStorage
  - Courses list with descriptions and search/filter
  - CourseDetail with working back button
  - ProgressBar component
*/

/* -------------------------
   Sample courses data
   ------------------------- */
const COURSES = [
  {
    id: "1",
    title: "Introdução à Inteligência Artificial",
    area: "IA",
    duration: "3 horas",
    desc:
      "História da IA, conceitos básicos, tipos de aprendizagem e aplicações práticas em negócios."
  },
  {
    id: "2",
    title: "Sustentabilidade e Tecnologia",
    area: "Sustentabilidade",
    duration: "2 horas",
    desc:
      "Como a tecnologia pode promover práticas sustentáveis; cases e microprojetos verdes."
  },
  {
    id: "3",
    title: "Comunicação e Soft Skills",
    area: "Soft Skills",
    duration: "2.5 horas",
    desc:
      "Técnicas de comunicação, feedback, escuta ativa e trabalho em equipe."
  },
  {
    id: "4",
    title: "Fundamentos de Gestão Ágil",
    area: "Gestão",
    duration: "4 horas",
    desc:
      "Introdução ao Agile, Scrum, Kanban e uso em times pequenos e startups."
  },
  {
    id: "5",
    title: "Ética e IA",
    area: "IA",
    duration: "1.5 horas",
    desc:
      "Questões éticas envolvendo IA, vieses, privacidade de dados e decisões automatizadas."
  }
];

const AREAS = ["Todas", "IA", "Sustentabilidade", "Soft Skills", "Gestão"];

/* -------------------------
   Utils: AsyncStorage keys
   ------------------------- */
const PROFILE_KEY = "@skillup_profile";

/* -------------------------
   Components
   ------------------------- */

function ProgressBar({ progress = 0 }) {
  const pct = Math.min(1, Math.max(0, progress));
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressBar, { width: `${pct * 100}%` }]} />
    </View>
  );
}

function CourseCard({ course, onPress }) {
  return (
    <TouchableOpacity style={styles.courseCard} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.courseBadge}>
          <Text style={{ color: "#fff", fontSize: 12 }}>{course.area}</Text>
        </View>
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.courseMeta}>{course.duration} • {course.area}</Text>
          <Text numberOfLines={2} style={styles.courseDesc}>{course.desc}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

/* -------------------------
   Screens
   ------------------------- */

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha email e senha");
      return;
    }
    const profile = { email };
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    navigation.replace("Main"); // remove Login from stack
  };

  return (
    <SafeAreaView style={styles.containerCenter}>
      <Image
        source={{
          uri:
            "https://raw.githubusercontent.com/expo/expo/main/docs/static/images/tutorial/splash.png"
        }}
        style={{ width: 120, height: 120, marginBottom: 20 }}
        resizeMode="contain"
      />
      <Text style={styles.title}>SkillUpPlus 2030+</Text>
      <Text style={{ textAlign: "center", marginBottom: 12 }}>
        Requalificação para o mercado do futuro — trilhas curtas e práticas.
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        style={styles.input}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
        <Text style={styles.primaryButtonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 16 }}>
        <Text style={{ color: "#666", fontSize: 12, textAlign: "center" }}>
          Use qualquer email/senha para demo. Perfil será salvo localmente.
        </Text>
      </View>
    </SafeAreaView>
  );
}

function HomeScreen({ navigation }) {
  const [progress, setProgress] = useState(0.35);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(PROFILE_KEY);
      if (raw) setProfile(JSON.parse(raw));
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>Olá, {profile.email ? profile.email.split("@")[0] : "Usuário"}</Text>
        <Text style={{ marginBottom: 8 }}>Progresso da sua trilha atual</Text>
        <ProgressBar progress={progress} />
        <View style={{ marginTop: 12, marginBottom: 8 }}>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => Alert.alert("Trilhas", "Funcionalidade de trilhas (demo).")}>
            <Text style={{ color: "#333" }}>Ver trilhas recomendadas</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ marginTop: 18, fontSize: 16, fontWeight: "600" }}>Objetivo do App</Text>
        <View style={styles.card}>
          <Text style={{ marginBottom: 6 }}>
            Este aplicativo oferece:
          </Text>
          <Text>• Autoavaliações de competências</Text>
          <Text>• Trilhas de aprendizado em IA, Sustentabilidade, Soft Skills e mais</Text>
          <Text>• Monitoramento de progresso e recomendações</Text>
          <Text>• Inclusão digital por meio de microcursos gamificados</Text>
        </View>

        <Text style={{ marginTop: 12, fontSize: 16, fontWeight: "600" }}>Destaques</Text>
        <View style={styles.card}>
          <Text>• Aprendizado prático</Text>
          <Text>• Trilha curta (micro-learning)</Text>
          <Text>• Interface simples e acessível</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function CoursesScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("Todas");
  const [data, setData] = useState(COURSES);

  useEffect(() => {
    filter();
  }, [query, area]);

  const filter = useCallback(() => {
    const q = query.trim().toLowerCase();
    let filtered = COURSES.filter((c) => {
      const matchesQuery =
        !q || c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
      const matchesArea = area === "Todas" || c.area === area;
      return matchesQuery && matchesArea;
    });
    setData(filtered);
  }, [query, area]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 12 }}>
        <TextInput
          placeholder="Buscar cursos (título ou descrição)"
          style={styles.input}
          value={query}
          onChangeText={setQuery}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
          {AREAS.map((a) => (
            <TouchableOpacity
              key={a}
              onPress={() => setArea(a)}
              style={[
                styles.areaPill,
                area === a ? styles.areaPillActive : styles.areaPillInactive
              ]}
            >
              <Text style={area === a ? { color: "#fff" } : { color: "#333" }}>{a}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ padding: 12 }}>
        {data.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 24 }}>Nenhum curso encontrado.</Text>
        ) : (
          data.map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              onPress={() => navigation.navigate("CourseDetail", { course: c })}
            />
          ))
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function CourseDetailScreen({ route, navigation }) {
  const { course } = route.params || {};
  if (!course) {
    return (
      <SafeAreaView style={styles.containerCenter}>
        <Text>Curso não encontrado</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header manual com botão de voltar (funciona mesmo se header hidden) */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            accessibilityLabel="Voltar"
          >
            <Text style={{ color: "#fff" }}>←</Text>
          </TouchableOpacity>
          <Text style={{ marginLeft: 12, fontSize: 18, fontWeight: "600" }}>{course.title}</Text>
        </View>

        <View style={styles.card}>
          <Text style={{ fontWeight: "700" }}>{course.title}</Text>
          <Text style={{ color: "#666", marginBottom: 8 }}>{course.duration} • {course.area}</Text>
          <Text style={{ marginBottom: 12 }}>{course.desc}</Text>

          <Text style={{ fontWeight: "600", marginBottom: 6 }}>O que você vai aprender</Text>
          <Text>• Conceitos principais</Text>
          <Text>• Aplicações práticas</Text>
          <Text>• Mini-projeto/atividade prática</Text>

          <TouchableOpacity
            style={[styles.primaryButton, { marginTop: 16 }]}
            onPress={() => Alert.alert("Iniciar curso", `Iniciando: ${course.title}`)}
          >
            <Text style={styles.primaryButtonText}>Iniciar Curso</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(PROFILE_KEY);
      if (raw) setProfile(JSON.parse(raw));
    })();
  }, []);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem(PROFILE_KEY);
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>Perfil</Text>
        <View style={styles.card}>
          <Text>Email: {profile.email || "—"}</Text>
          <Text>Progresso estimado: 35%</Text>
          <ProgressBar progress={0.35} />
          <TouchableOpacity style={styles.secondaryButton} onPress={() => Alert.alert("Editar", "Editar perfil (demo).")}>
            <Text>Editar perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.primaryButton, { marginTop: 12 }]} onPress={handleSignOut}>
            <Text style={styles.primaryButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* -------------------------
   Navigation containers
   ------------------------- */
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: "Home" }} />
      <Tab.Screen name="CoursesTab" component={CoursesScreen} options={{ title: "Cursos" }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: "Perfil" }} />
    </Tab.Navigator>
  );
}

/* -------------------------
   Root App
   ------------------------- */

export default function App() {
  // check if user logged in already and set initial route
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(PROFILE_KEY);
      setInitialRoute(raw ? "Main" : "Login");
    })();
  }, []);

  if (initialRoute === null) {
    // still loading
    return (
      <SafeAreaView style={styles.containerCenter}>
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={Tabs} />
        <Stack.Screen
          name="CourseDetail"
          component={CourseDetailScreen}
          options={{
            // If you want header from the native stack instead of manual back button,
            // you could set headerShown: true and headerBackTitleVisible: true
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* -------------------------
   Styles
   ------------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  containerCenter: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fff"
  },
  primaryButton: {
    backgroundColor: "#0066cc",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center"
  },
  primaryButtonText: { color: "#fff", fontWeight: "700" },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center"
  },
  progressTrack: {
    height: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 8
  },
  progressBar: { height: 12, backgroundColor: "#4caf50" },

  card: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#eee",
    marginTop: 8
  },

  courseCard: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee"
  },
  courseBadge: {
    backgroundColor: "#0066cc",
    padding: 8,
    borderRadius: 8,
    minWidth: 56,
    alignItems: "center",
    justifyContent: "center"
  },
  courseTitle: { fontSize: 16, fontWeight: "700" },
  courseMeta: { fontSize: 12, color: "#666", marginTop: 4 },
  courseDesc: { fontSize: 13, color: "#444", marginTop: 6 },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#0066cc",
    alignItems: "center",
    justifyContent: "center"
  },

  areaPill: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1
  },
  areaPillActive: {
    backgroundColor: "#0066cc",
    borderColor: "#0066cc"
  },
  areaPillInactive: {
    backgroundColor: "#fff",
    borderColor: "#eee"
  }
});
