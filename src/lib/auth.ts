import jwt from 'jsonwebtoken';

// Garantir que JWT_SECRET é uma string válida
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || typeof JWT_SECRET !== 'string') {
  console.error('[FATAL] JWT_SECRET não definida corretamente. Configure no .env.production');
  process.exit(1); // Interrompe a execução do servidor se não encontrar JWT_SECRET
}

// Definição da interface para o payload do JWT
export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

// Função para assinar o token JWT
export function signToken(payload: JWTPayload): string {
  if (!payload || typeof payload !== 'object') {
    throw new Error("Payload deve ser um objeto válido e não pode ser undefined ou null");
  }

  // Garantir que JWT_SECRET seja sempre uma string
  const secret = JWT_SECRET as string;  // Cast explicito para garantir que é uma string
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

// Função para verificar o token JWT
export function verifyToken(token: string): JWTPayload {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não está configurado.");
  }

  const secret = JWT_SECRET as string;  // Cast explicito para garantir que é uma string
  return jwt.verify(token, secret) as JWTPayload;
}

// Função para decodificar o token JWT sem verificar a assinatura
export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
}
