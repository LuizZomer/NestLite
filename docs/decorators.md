# Decorators

Este arquivo explica todos os decorators utilizados no projeto, que servem para marcar classes e métodos, armazenar metadados e permitir a injeção de dependências.

## 1. `@Injectable()`

Marca uma classe como injetável.

- **Obrigatório**: só pode ser injetado se a classe estiver registrada no módulo (`providers`).
- Sem isso, o container lança erro.

```ts
@Injectable()
class UserService {}
```

- Armazena metadado `isInjectable = true` usando `reflect-metadata`.
- O container verifica este metadado antes de criar a instância.

## 2. `@Controller(path: string)`

Marca uma classe como controller e define uma rota base.

```ts
@Controller("/user")
class UserController {}
```

- `path` será usado como prefixo de todas as rotas da classe.
- O Factory usa `Reflect.getMetadata("path", ControllerClass)` para criar o Router.

## 3. `@Module({ controllers, providers, imports })`

Define um módulo contendo:

- `controllers`: controllers pertencentes ao módulo.
- `providers`: serviços injetáveis (obrigatórios para injeção).
- `imports`: outros módulos importados.

```ts
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [OtherModule],
})
class UserModule {}
```

- Armazena metadados `controllers`, `providers` e `imports`.
- Permite modularidade e composição de módulos.

## 4. `Decorator de método para definir rotas HTTP GET.`

Decoradores de rota (@Get, @Post, @Put, @Delete) funcionam da mesma forma:

- Cada decorador salva `path` e `method` (GET, POST, PUT, DELETE) no metadado do método.
- O Factory itera sobre os métodos do controller e registra as rotas no Express.
- Dessa forma, você pode adicionar novos métodos HTTP de forma consistente,
  sem precisar mudar a lógica do Factory.

Exemplo:

```ts
@Get("/")
async findAll() {}
```
