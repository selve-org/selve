
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model Question
 * 
 */
export type Question = $Result.DefaultSelection<Prisma.$QuestionPayload>
/**
 * Model Response
 * 
 */
export type Response = $Result.DefaultSelection<Prisma.$ResponsePayload>
/**
 * Model InviteLink
 * 
 */
export type InviteLink = $Result.DefaultSelection<Prisma.$InviteLinkPayload>
/**
 * Model RateLimit
 * 
 */
export type RateLimit = $Result.DefaultSelection<Prisma.$RateLimitPayload>
/**
 * Model AssessmentSession
 * 
 */
export type AssessmentSession = $Result.DefaultSelection<Prisma.$AssessmentSessionPayload>
/**
 * Model AssessmentResult
 * 
 */
export type AssessmentResult = $Result.DefaultSelection<Prisma.$AssessmentResultPayload>
/**
 * Model AssessmentTemplate
 * 
 */
export type AssessmentTemplate = $Result.DefaultSelection<Prisma.$AssessmentTemplatePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.question`: Exposes CRUD operations for the **Question** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Questions
    * const questions = await prisma.question.findMany()
    * ```
    */
  get question(): Prisma.QuestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.response`: Exposes CRUD operations for the **Response** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Responses
    * const responses = await prisma.response.findMany()
    * ```
    */
  get response(): Prisma.ResponseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inviteLink`: Exposes CRUD operations for the **InviteLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InviteLinks
    * const inviteLinks = await prisma.inviteLink.findMany()
    * ```
    */
  get inviteLink(): Prisma.InviteLinkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rateLimit`: Exposes CRUD operations for the **RateLimit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RateLimits
    * const rateLimits = await prisma.rateLimit.findMany()
    * ```
    */
  get rateLimit(): Prisma.RateLimitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assessmentSession`: Exposes CRUD operations for the **AssessmentSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssessmentSessions
    * const assessmentSessions = await prisma.assessmentSession.findMany()
    * ```
    */
  get assessmentSession(): Prisma.AssessmentSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assessmentResult`: Exposes CRUD operations for the **AssessmentResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssessmentResults
    * const assessmentResults = await prisma.assessmentResult.findMany()
    * ```
    */
  get assessmentResult(): Prisma.AssessmentResultDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assessmentTemplate`: Exposes CRUD operations for the **AssessmentTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssessmentTemplates
    * const assessmentTemplates = await prisma.assessmentTemplate.findMany()
    * ```
    */
  get assessmentTemplate(): Prisma.AssessmentTemplateDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 393aa359c9ad4a4bb28630fb5613f9c281cde053
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Profile: 'Profile',
    Question: 'Question',
    Response: 'Response',
    InviteLink: 'InviteLink',
    RateLimit: 'RateLimit',
    AssessmentSession: 'AssessmentSession',
    AssessmentResult: 'AssessmentResult',
    AssessmentTemplate: 'AssessmentTemplate'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "profile" | "question" | "response" | "inviteLink" | "rateLimit" | "assessmentSession" | "assessmentResult" | "assessmentTemplate"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      Question: {
        payload: Prisma.$QuestionPayload<ExtArgs>
        fields: Prisma.QuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findFirst: {
            args: Prisma.QuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findMany: {
            args: Prisma.QuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          create: {
            args: Prisma.QuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          createMany: {
            args: Prisma.QuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          delete: {
            args: Prisma.QuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          update: {
            args: Prisma.QuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          deleteMany: {
            args: Prisma.QuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          aggregate: {
            args: Prisma.QuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion>
          }
          groupBy: {
            args: Prisma.QuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionCountAggregateOutputType> | number
          }
        }
      }
      Response: {
        payload: Prisma.$ResponsePayload<ExtArgs>
        fields: Prisma.ResponseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResponseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResponseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          findFirst: {
            args: Prisma.ResponseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResponseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          findMany: {
            args: Prisma.ResponseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>[]
          }
          create: {
            args: Prisma.ResponseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          createMany: {
            args: Prisma.ResponseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResponseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>[]
          }
          delete: {
            args: Prisma.ResponseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          update: {
            args: Prisma.ResponseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          deleteMany: {
            args: Prisma.ResponseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResponseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ResponseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          aggregate: {
            args: Prisma.ResponseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResponse>
          }
          groupBy: {
            args: Prisma.ResponseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResponseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResponseCountArgs<ExtArgs>
            result: $Utils.Optional<ResponseCountAggregateOutputType> | number
          }
        }
      }
      InviteLink: {
        payload: Prisma.$InviteLinkPayload<ExtArgs>
        fields: Prisma.InviteLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InviteLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InviteLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload>
          }
          findFirst: {
            args: Prisma.InviteLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InviteLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload>
          }
          findMany: {
            args: Prisma.InviteLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload>[]
          }
          create: {
            args: Prisma.InviteLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload>
          }
          createMany: {
            args: Prisma.InviteLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InviteLinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload>[]
          }
          delete: {
            args: Prisma.InviteLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload>
          }
          update: {
            args: Prisma.InviteLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload>
          }
          deleteMany: {
            args: Prisma.InviteLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InviteLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InviteLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload>
          }
          aggregate: {
            args: Prisma.InviteLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInviteLink>
          }
          groupBy: {
            args: Prisma.InviteLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<InviteLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.InviteLinkCountArgs<ExtArgs>
            result: $Utils.Optional<InviteLinkCountAggregateOutputType> | number
          }
        }
      }
      RateLimit: {
        payload: Prisma.$RateLimitPayload<ExtArgs>
        fields: Prisma.RateLimitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RateLimitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RateLimitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          findFirst: {
            args: Prisma.RateLimitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RateLimitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          findMany: {
            args: Prisma.RateLimitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>[]
          }
          create: {
            args: Prisma.RateLimitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          createMany: {
            args: Prisma.RateLimitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RateLimitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>[]
          }
          delete: {
            args: Prisma.RateLimitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          update: {
            args: Prisma.RateLimitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          deleteMany: {
            args: Prisma.RateLimitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RateLimitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RateLimitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          aggregate: {
            args: Prisma.RateLimitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRateLimit>
          }
          groupBy: {
            args: Prisma.RateLimitGroupByArgs<ExtArgs>
            result: $Utils.Optional<RateLimitGroupByOutputType>[]
          }
          count: {
            args: Prisma.RateLimitCountArgs<ExtArgs>
            result: $Utils.Optional<RateLimitCountAggregateOutputType> | number
          }
        }
      }
      AssessmentSession: {
        payload: Prisma.$AssessmentSessionPayload<ExtArgs>
        fields: Prisma.AssessmentSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssessmentSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssessmentSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentSessionPayload>
          }
          findFirst: {
            args: Prisma.AssessmentSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssessmentSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentSessionPayload>
          }
          findMany: {
            args: Prisma.AssessmentSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentSessionPayload>[]
          }
          create: {
            args: Prisma.AssessmentSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentSessionPayload>
          }
          createMany: {
            args: Prisma.AssessmentSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssessmentSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentSessionPayload>[]
          }
          delete: {
            args: Prisma.AssessmentSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentSessionPayload>
          }
          update: {
            args: Prisma.AssessmentSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentSessionPayload>
          }
          deleteMany: {
            args: Prisma.AssessmentSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssessmentSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AssessmentSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentSessionPayload>
          }
          aggregate: {
            args: Prisma.AssessmentSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssessmentSession>
          }
          groupBy: {
            args: Prisma.AssessmentSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssessmentSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssessmentSessionCountArgs<ExtArgs>
            result: $Utils.Optional<AssessmentSessionCountAggregateOutputType> | number
          }
        }
      }
      AssessmentResult: {
        payload: Prisma.$AssessmentResultPayload<ExtArgs>
        fields: Prisma.AssessmentResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssessmentResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssessmentResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentResultPayload>
          }
          findFirst: {
            args: Prisma.AssessmentResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssessmentResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentResultPayload>
          }
          findMany: {
            args: Prisma.AssessmentResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentResultPayload>[]
          }
          create: {
            args: Prisma.AssessmentResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentResultPayload>
          }
          createMany: {
            args: Prisma.AssessmentResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssessmentResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentResultPayload>[]
          }
          delete: {
            args: Prisma.AssessmentResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentResultPayload>
          }
          update: {
            args: Prisma.AssessmentResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentResultPayload>
          }
          deleteMany: {
            args: Prisma.AssessmentResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssessmentResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AssessmentResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentResultPayload>
          }
          aggregate: {
            args: Prisma.AssessmentResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssessmentResult>
          }
          groupBy: {
            args: Prisma.AssessmentResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssessmentResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssessmentResultCountArgs<ExtArgs>
            result: $Utils.Optional<AssessmentResultCountAggregateOutputType> | number
          }
        }
      }
      AssessmentTemplate: {
        payload: Prisma.$AssessmentTemplatePayload<ExtArgs>
        fields: Prisma.AssessmentTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssessmentTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssessmentTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentTemplatePayload>
          }
          findFirst: {
            args: Prisma.AssessmentTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssessmentTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentTemplatePayload>
          }
          findMany: {
            args: Prisma.AssessmentTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentTemplatePayload>[]
          }
          create: {
            args: Prisma.AssessmentTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentTemplatePayload>
          }
          createMany: {
            args: Prisma.AssessmentTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssessmentTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentTemplatePayload>[]
          }
          delete: {
            args: Prisma.AssessmentTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentTemplatePayload>
          }
          update: {
            args: Prisma.AssessmentTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentTemplatePayload>
          }
          deleteMany: {
            args: Prisma.AssessmentTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssessmentTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AssessmentTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentTemplatePayload>
          }
          aggregate: {
            args: Prisma.AssessmentTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssessmentTemplate>
          }
          groupBy: {
            args: Prisma.AssessmentTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssessmentTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssessmentTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<AssessmentTemplateCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    profile?: ProfileOmit
    question?: QuestionOmit
    response?: ResponseOmit
    inviteLink?: InviteLinkOmit
    rateLimit?: RateLimitOmit
    assessmentSession?: AssessmentSessionOmit
    assessmentResult?: AssessmentResultOmit
    assessmentTemplate?: AssessmentTemplateOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    inviteLinksSent: number
    inviteLinksReceived: number
    responsesAbout: number
    responsesGiven: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inviteLinksSent?: boolean | UserCountOutputTypeCountInviteLinksSentArgs
    inviteLinksReceived?: boolean | UserCountOutputTypeCountInviteLinksReceivedArgs
    responsesAbout?: boolean | UserCountOutputTypeCountResponsesAboutArgs
    responsesGiven?: boolean | UserCountOutputTypeCountResponsesGivenArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInviteLinksSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InviteLinkWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInviteLinksReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InviteLinkWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResponsesAboutArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResponseWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResponsesGivenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResponseWhereInput
  }


  /**
   * Count Type QuestionCountOutputType
   */

  export type QuestionCountOutputType = {
    responses: number
  }

  export type QuestionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    responses?: boolean | QuestionCountOutputTypeCountResponsesArgs
  }

  // Custom InputTypes
  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionCountOutputType
     */
    select?: QuestionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeCountResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResponseWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    clerkId: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    clerkId: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    createdAt: number
    updatedAt: number
    clerkId: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    clerkId?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    clerkId?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    clerkId?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    createdAt: Date
    updatedAt: Date
    clerkId: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clerkId?: boolean
    inviteLinksSent?: boolean | User$inviteLinksSentArgs<ExtArgs>
    inviteLinksReceived?: boolean | User$inviteLinksReceivedArgs<ExtArgs>
    profile?: boolean | User$profileArgs<ExtArgs>
    responsesAbout?: boolean | User$responsesAboutArgs<ExtArgs>
    responsesGiven?: boolean | User$responsesGivenArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clerkId?: boolean
  }, ExtArgs["result"]["user"]>


  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clerkId?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "createdAt" | "updatedAt" | "clerkId", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inviteLinksSent?: boolean | User$inviteLinksSentArgs<ExtArgs>
    inviteLinksReceived?: boolean | User$inviteLinksReceivedArgs<ExtArgs>
    profile?: boolean | User$profileArgs<ExtArgs>
    responsesAbout?: boolean | User$responsesAboutArgs<ExtArgs>
    responsesGiven?: boolean | User$responsesGivenArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      inviteLinksSent: Prisma.$InviteLinkPayload<ExtArgs>[]
      inviteLinksReceived: Prisma.$InviteLinkPayload<ExtArgs>[]
      profile: Prisma.$ProfilePayload<ExtArgs> | null
      responsesAbout: Prisma.$ResponsePayload<ExtArgs>[]
      responsesGiven: Prisma.$ResponsePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      createdAt: Date
      updatedAt: Date
      clerkId: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inviteLinksSent<T extends User$inviteLinksSentArgs<ExtArgs> = {}>(args?: Subset<T, User$inviteLinksSentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    inviteLinksReceived<T extends User$inviteLinksReceivedArgs<ExtArgs> = {}>(args?: Subset<T, User$inviteLinksReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    profile<T extends User$profileArgs<ExtArgs> = {}>(args?: Subset<T, User$profileArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    responsesAbout<T extends User$responsesAboutArgs<ExtArgs> = {}>(args?: Subset<T, User$responsesAboutArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    responsesGiven<T extends User$responsesGivenArgs<ExtArgs> = {}>(args?: Subset<T, User$responsesGivenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly clerkId: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.inviteLinksSent
   */
  export type User$inviteLinksSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    where?: InviteLinkWhereInput
    orderBy?: InviteLinkOrderByWithRelationInput | InviteLinkOrderByWithRelationInput[]
    cursor?: InviteLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InviteLinkScalarFieldEnum | InviteLinkScalarFieldEnum[]
  }

  /**
   * User.inviteLinksReceived
   */
  export type User$inviteLinksReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    where?: InviteLinkWhereInput
    orderBy?: InviteLinkOrderByWithRelationInput | InviteLinkOrderByWithRelationInput[]
    cursor?: InviteLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InviteLinkScalarFieldEnum | InviteLinkScalarFieldEnum[]
  }

  /**
   * User.profile
   */
  export type User$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * User.responsesAbout
   */
  export type User$responsesAboutArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    where?: ResponseWhereInput
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    cursor?: ResponseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * User.responsesGiven
   */
  export type User$responsesGivenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    where?: ResponseWhereInput
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    cursor?: ResponseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    bio: string | null
    avatarUrl: string | null
    createdAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    bio: string | null
    avatarUrl: string | null
    createdAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    userId: number
    bio: number
    avatarUrl: number
    personality: number
    createdAt: number
    _all: number
  }


  export type ProfileMinAggregateInputType = {
    id?: true
    userId?: true
    bio?: true
    avatarUrl?: true
    createdAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    bio?: true
    avatarUrl?: true
    createdAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    userId?: true
    bio?: true
    avatarUrl?: true
    personality?: true
    createdAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    userId: string
    bio: string | null
    avatarUrl: string | null
    personality: JsonValue | null
    createdAt: Date
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    bio?: boolean
    avatarUrl?: boolean
    personality?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    bio?: boolean
    avatarUrl?: boolean
    personality?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>


  export type ProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    bio?: boolean
    avatarUrl?: boolean
    personality?: boolean
    createdAt?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "bio" | "avatarUrl" | "personality" | "createdAt", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      bio: string | null
      avatarUrl: string | null
      personality: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly userId: FieldRef<"Profile", 'String'>
    readonly bio: FieldRef<"Profile", 'String'>
    readonly avatarUrl: FieldRef<"Profile", 'String'>
    readonly personality: FieldRef<"Profile", 'Json'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model Question
   */

  export type AggregateQuestion = {
    _count: QuestionCountAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  export type QuestionMinAggregateOutputType = {
    id: string | null
    text: string | null
    category: string | null
    isThirdParty: boolean | null
    createdAt: Date | null
  }

  export type QuestionMaxAggregateOutputType = {
    id: string | null
    text: string | null
    category: string | null
    isThirdParty: boolean | null
    createdAt: Date | null
  }

  export type QuestionCountAggregateOutputType = {
    id: number
    text: number
    category: number
    isThirdParty: number
    createdAt: number
    _all: number
  }


  export type QuestionMinAggregateInputType = {
    id?: true
    text?: true
    category?: true
    isThirdParty?: true
    createdAt?: true
  }

  export type QuestionMaxAggregateInputType = {
    id?: true
    text?: true
    category?: true
    isThirdParty?: true
    createdAt?: true
  }

  export type QuestionCountAggregateInputType = {
    id?: true
    text?: true
    category?: true
    isThirdParty?: true
    createdAt?: true
    _all?: true
  }

  export type QuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Question to aggregate.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Questions
    **/
    _count?: true | QuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionMaxAggregateInputType
  }

  export type GetQuestionAggregateType<T extends QuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion[P]>
      : GetScalarType<T[P], AggregateQuestion[P]>
  }




  export type QuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithAggregationInput | QuestionOrderByWithAggregationInput[]
    by: QuestionScalarFieldEnum[] | QuestionScalarFieldEnum
    having?: QuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionCountAggregateInputType | true
    _min?: QuestionMinAggregateInputType
    _max?: QuestionMaxAggregateInputType
  }

  export type QuestionGroupByOutputType = {
    id: string
    text: string
    category: string | null
    isThirdParty: boolean
    createdAt: Date
    _count: QuestionCountAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  type GetQuestionGroupByPayload<T extends QuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionGroupByOutputType[P]>
        }
      >
    >


  export type QuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    category?: boolean
    isThirdParty?: boolean
    createdAt?: boolean
    responses?: boolean | Question$responsesArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    category?: boolean
    isThirdParty?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["question"]>


  export type QuestionSelectScalar = {
    id?: boolean
    text?: boolean
    category?: boolean
    isThirdParty?: boolean
    createdAt?: boolean
  }

  export type QuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "text" | "category" | "isThirdParty" | "createdAt", ExtArgs["result"]["question"]>
  export type QuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    responses?: boolean | Question$responsesArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $QuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Question"
    objects: {
      responses: Prisma.$ResponsePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      text: string
      category: string | null
      isThirdParty: boolean
      createdAt: Date
    }, ExtArgs["result"]["question"]>
    composites: {}
  }

  type QuestionGetPayload<S extends boolean | null | undefined | QuestionDefaultArgs> = $Result.GetResult<Prisma.$QuestionPayload, S>

  type QuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuestionCountAggregateInputType | true
    }

  export interface QuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Question'], meta: { name: 'Question' } }
    /**
     * Find zero or one Question that matches the filter.
     * @param {QuestionFindUniqueArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionFindUniqueArgs>(args: SelectSubset<T, QuestionFindUniqueArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Question that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuestionFindUniqueOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionFindFirstArgs>(args?: SelectSubset<T, QuestionFindFirstArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Questions
     * const questions = await prisma.question.findMany()
     * 
     * // Get first 10 Questions
     * const questions = await prisma.question.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionWithIdOnly = await prisma.question.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionFindManyArgs>(args?: SelectSubset<T, QuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Question.
     * @param {QuestionCreateArgs} args - Arguments to create a Question.
     * @example
     * // Create one Question
     * const Question = await prisma.question.create({
     *   data: {
     *     // ... data to create a Question
     *   }
     * })
     * 
     */
    create<T extends QuestionCreateArgs>(args: SelectSubset<T, QuestionCreateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Questions.
     * @param {QuestionCreateManyArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionCreateManyArgs>(args?: SelectSubset<T, QuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Questions and returns the data saved in the database.
     * @param {QuestionCreateManyAndReturnArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Question.
     * @param {QuestionDeleteArgs} args - Arguments to delete one Question.
     * @example
     * // Delete one Question
     * const Question = await prisma.question.delete({
     *   where: {
     *     // ... filter to delete one Question
     *   }
     * })
     * 
     */
    delete<T extends QuestionDeleteArgs>(args: SelectSubset<T, QuestionDeleteArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Question.
     * @param {QuestionUpdateArgs} args - Arguments to update one Question.
     * @example
     * // Update one Question
     * const question = await prisma.question.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionUpdateArgs>(args: SelectSubset<T, QuestionUpdateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Questions.
     * @param {QuestionDeleteManyArgs} args - Arguments to filter Questions to delete.
     * @example
     * // Delete a few Questions
     * const { count } = await prisma.question.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionDeleteManyArgs>(args?: SelectSubset<T, QuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionUpdateManyArgs>(args: SelectSubset<T, QuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Question.
     * @param {QuestionUpsertArgs} args - Arguments to update or create a Question.
     * @example
     * // Update or create a Question
     * const question = await prisma.question.upsert({
     *   create: {
     *     // ... data to create a Question
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question we want to update
     *   }
     * })
     */
    upsert<T extends QuestionUpsertArgs>(args: SelectSubset<T, QuestionUpsertArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionCountArgs} args - Arguments to filter Questions to count.
     * @example
     * // Count the number of Questions
     * const count = await prisma.question.count({
     *   where: {
     *     // ... the filter for the Questions we want to count
     *   }
     * })
    **/
    count<T extends QuestionCountArgs>(
      args?: Subset<T, QuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionAggregateArgs>(args: Subset<T, QuestionAggregateArgs>): Prisma.PrismaPromise<GetQuestionAggregateType<T>>

    /**
     * Group by Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionGroupByArgs['orderBy'] }
        : { orderBy?: QuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Question model
   */
  readonly fields: QuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Question.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    responses<T extends Question$responsesArgs<ExtArgs> = {}>(args?: Subset<T, Question$responsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Question model
   */
  interface QuestionFieldRefs {
    readonly id: FieldRef<"Question", 'String'>
    readonly text: FieldRef<"Question", 'String'>
    readonly category: FieldRef<"Question", 'String'>
    readonly isThirdParty: FieldRef<"Question", 'Boolean'>
    readonly createdAt: FieldRef<"Question", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Question findUnique
   */
  export type QuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findUniqueOrThrow
   */
  export type QuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findFirst
   */
  export type QuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findFirstOrThrow
   */
  export type QuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findMany
   */
  export type QuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Questions to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question create
   */
  export type QuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a Question.
     */
    data: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
  }

  /**
   * Question createMany
   */
  export type QuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Question createManyAndReturn
   */
  export type QuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Question update
   */
  export type QuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a Question.
     */
    data: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
    /**
     * Choose, which Question to update.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question updateMany
   */
  export type QuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
  }

  /**
   * Question upsert
   */
  export type QuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the Question to update in case it exists.
     */
    where: QuestionWhereUniqueInput
    /**
     * In case the Question found by the `where` argument doesn't exist, create a new Question with this data.
     */
    create: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
    /**
     * In case the Question was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
  }

  /**
   * Question delete
   */
  export type QuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter which Question to delete.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question deleteMany
   */
  export type QuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Questions to delete
     */
    where?: QuestionWhereInput
  }

  /**
   * Question.responses
   */
  export type Question$responsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    where?: ResponseWhereInput
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    cursor?: ResponseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Question without action
   */
  export type QuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
  }


  /**
   * Model Response
   */

  export type AggregateResponse = {
    _count: ResponseCountAggregateOutputType | null
    _avg: ResponseAvgAggregateOutputType | null
    _sum: ResponseSumAggregateOutputType | null
    _min: ResponseMinAggregateOutputType | null
    _max: ResponseMaxAggregateOutputType | null
  }

  export type ResponseAvgAggregateOutputType = {
    responseTime: number | null
    qualityScore: number | null
  }

  export type ResponseSumAggregateOutputType = {
    responseTime: number | null
    qualityScore: number | null
  }

  export type ResponseMinAggregateOutputType = {
    id: string | null
    questionId: string | null
    answeredById: string | null
    aboutUserId: string | null
    answer: string | null
    notSure: boolean | null
    responseTime: number | null
    qualityScore: number | null
    flaggedMalicious: boolean | null
    createdAt: Date | null
  }

  export type ResponseMaxAggregateOutputType = {
    id: string | null
    questionId: string | null
    answeredById: string | null
    aboutUserId: string | null
    answer: string | null
    notSure: boolean | null
    responseTime: number | null
    qualityScore: number | null
    flaggedMalicious: boolean | null
    createdAt: Date | null
  }

  export type ResponseCountAggregateOutputType = {
    id: number
    questionId: number
    answeredById: number
    aboutUserId: number
    answer: number
    notSure: number
    responseTime: number
    qualityScore: number
    flaggedMalicious: number
    createdAt: number
    _all: number
  }


  export type ResponseAvgAggregateInputType = {
    responseTime?: true
    qualityScore?: true
  }

  export type ResponseSumAggregateInputType = {
    responseTime?: true
    qualityScore?: true
  }

  export type ResponseMinAggregateInputType = {
    id?: true
    questionId?: true
    answeredById?: true
    aboutUserId?: true
    answer?: true
    notSure?: true
    responseTime?: true
    qualityScore?: true
    flaggedMalicious?: true
    createdAt?: true
  }

  export type ResponseMaxAggregateInputType = {
    id?: true
    questionId?: true
    answeredById?: true
    aboutUserId?: true
    answer?: true
    notSure?: true
    responseTime?: true
    qualityScore?: true
    flaggedMalicious?: true
    createdAt?: true
  }

  export type ResponseCountAggregateInputType = {
    id?: true
    questionId?: true
    answeredById?: true
    aboutUserId?: true
    answer?: true
    notSure?: true
    responseTime?: true
    qualityScore?: true
    flaggedMalicious?: true
    createdAt?: true
    _all?: true
  }

  export type ResponseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Response to aggregate.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Responses
    **/
    _count?: true | ResponseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResponseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResponseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResponseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResponseMaxAggregateInputType
  }

  export type GetResponseAggregateType<T extends ResponseAggregateArgs> = {
        [P in keyof T & keyof AggregateResponse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResponse[P]>
      : GetScalarType<T[P], AggregateResponse[P]>
  }




  export type ResponseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResponseWhereInput
    orderBy?: ResponseOrderByWithAggregationInput | ResponseOrderByWithAggregationInput[]
    by: ResponseScalarFieldEnum[] | ResponseScalarFieldEnum
    having?: ResponseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResponseCountAggregateInputType | true
    _avg?: ResponseAvgAggregateInputType
    _sum?: ResponseSumAggregateInputType
    _min?: ResponseMinAggregateInputType
    _max?: ResponseMaxAggregateInputType
  }

  export type ResponseGroupByOutputType = {
    id: string
    questionId: string
    answeredById: string
    aboutUserId: string
    answer: string
    notSure: boolean
    responseTime: number | null
    qualityScore: number | null
    flaggedMalicious: boolean
    createdAt: Date
    _count: ResponseCountAggregateOutputType | null
    _avg: ResponseAvgAggregateOutputType | null
    _sum: ResponseSumAggregateOutputType | null
    _min: ResponseMinAggregateOutputType | null
    _max: ResponseMaxAggregateOutputType | null
  }

  type GetResponseGroupByPayload<T extends ResponseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResponseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResponseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResponseGroupByOutputType[P]>
            : GetScalarType<T[P], ResponseGroupByOutputType[P]>
        }
      >
    >


  export type ResponseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    answeredById?: boolean
    aboutUserId?: boolean
    answer?: boolean
    notSure?: boolean
    responseTime?: boolean
    qualityScore?: boolean
    flaggedMalicious?: boolean
    createdAt?: boolean
    aboutUser?: boolean | UserDefaultArgs<ExtArgs>
    answeredByUser?: boolean | UserDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["response"]>

  export type ResponseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    answeredById?: boolean
    aboutUserId?: boolean
    answer?: boolean
    notSure?: boolean
    responseTime?: boolean
    qualityScore?: boolean
    flaggedMalicious?: boolean
    createdAt?: boolean
    aboutUser?: boolean | UserDefaultArgs<ExtArgs>
    answeredByUser?: boolean | UserDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["response"]>


  export type ResponseSelectScalar = {
    id?: boolean
    questionId?: boolean
    answeredById?: boolean
    aboutUserId?: boolean
    answer?: boolean
    notSure?: boolean
    responseTime?: boolean
    qualityScore?: boolean
    flaggedMalicious?: boolean
    createdAt?: boolean
  }

  export type ResponseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "questionId" | "answeredById" | "aboutUserId" | "answer" | "notSure" | "responseTime" | "qualityScore" | "flaggedMalicious" | "createdAt", ExtArgs["result"]["response"]>
  export type ResponseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aboutUser?: boolean | UserDefaultArgs<ExtArgs>
    answeredByUser?: boolean | UserDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }
  export type ResponseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aboutUser?: boolean | UserDefaultArgs<ExtArgs>
    answeredByUser?: boolean | UserDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type $ResponsePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Response"
    objects: {
      aboutUser: Prisma.$UserPayload<ExtArgs>
      answeredByUser: Prisma.$UserPayload<ExtArgs>
      question: Prisma.$QuestionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      questionId: string
      answeredById: string
      aboutUserId: string
      answer: string
      notSure: boolean
      responseTime: number | null
      qualityScore: number | null
      flaggedMalicious: boolean
      createdAt: Date
    }, ExtArgs["result"]["response"]>
    composites: {}
  }

  type ResponseGetPayload<S extends boolean | null | undefined | ResponseDefaultArgs> = $Result.GetResult<Prisma.$ResponsePayload, S>

  type ResponseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResponseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResponseCountAggregateInputType | true
    }

  export interface ResponseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Response'], meta: { name: 'Response' } }
    /**
     * Find zero or one Response that matches the filter.
     * @param {ResponseFindUniqueArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResponseFindUniqueArgs>(args: SelectSubset<T, ResponseFindUniqueArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Response that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResponseFindUniqueOrThrowArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResponseFindUniqueOrThrowArgs>(args: SelectSubset<T, ResponseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Response that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindFirstArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResponseFindFirstArgs>(args?: SelectSubset<T, ResponseFindFirstArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Response that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindFirstOrThrowArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResponseFindFirstOrThrowArgs>(args?: SelectSubset<T, ResponseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Responses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Responses
     * const responses = await prisma.response.findMany()
     * 
     * // Get first 10 Responses
     * const responses = await prisma.response.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const responseWithIdOnly = await prisma.response.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResponseFindManyArgs>(args?: SelectSubset<T, ResponseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Response.
     * @param {ResponseCreateArgs} args - Arguments to create a Response.
     * @example
     * // Create one Response
     * const Response = await prisma.response.create({
     *   data: {
     *     // ... data to create a Response
     *   }
     * })
     * 
     */
    create<T extends ResponseCreateArgs>(args: SelectSubset<T, ResponseCreateArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Responses.
     * @param {ResponseCreateManyArgs} args - Arguments to create many Responses.
     * @example
     * // Create many Responses
     * const response = await prisma.response.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResponseCreateManyArgs>(args?: SelectSubset<T, ResponseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Responses and returns the data saved in the database.
     * @param {ResponseCreateManyAndReturnArgs} args - Arguments to create many Responses.
     * @example
     * // Create many Responses
     * const response = await prisma.response.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Responses and only return the `id`
     * const responseWithIdOnly = await prisma.response.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResponseCreateManyAndReturnArgs>(args?: SelectSubset<T, ResponseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Response.
     * @param {ResponseDeleteArgs} args - Arguments to delete one Response.
     * @example
     * // Delete one Response
     * const Response = await prisma.response.delete({
     *   where: {
     *     // ... filter to delete one Response
     *   }
     * })
     * 
     */
    delete<T extends ResponseDeleteArgs>(args: SelectSubset<T, ResponseDeleteArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Response.
     * @param {ResponseUpdateArgs} args - Arguments to update one Response.
     * @example
     * // Update one Response
     * const response = await prisma.response.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResponseUpdateArgs>(args: SelectSubset<T, ResponseUpdateArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Responses.
     * @param {ResponseDeleteManyArgs} args - Arguments to filter Responses to delete.
     * @example
     * // Delete a few Responses
     * const { count } = await prisma.response.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResponseDeleteManyArgs>(args?: SelectSubset<T, ResponseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Responses
     * const response = await prisma.response.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResponseUpdateManyArgs>(args: SelectSubset<T, ResponseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Response.
     * @param {ResponseUpsertArgs} args - Arguments to update or create a Response.
     * @example
     * // Update or create a Response
     * const response = await prisma.response.upsert({
     *   create: {
     *     // ... data to create a Response
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Response we want to update
     *   }
     * })
     */
    upsert<T extends ResponseUpsertArgs>(args: SelectSubset<T, ResponseUpsertArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseCountArgs} args - Arguments to filter Responses to count.
     * @example
     * // Count the number of Responses
     * const count = await prisma.response.count({
     *   where: {
     *     // ... the filter for the Responses we want to count
     *   }
     * })
    **/
    count<T extends ResponseCountArgs>(
      args?: Subset<T, ResponseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResponseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Response.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResponseAggregateArgs>(args: Subset<T, ResponseAggregateArgs>): Prisma.PrismaPromise<GetResponseAggregateType<T>>

    /**
     * Group by Response.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResponseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResponseGroupByArgs['orderBy'] }
        : { orderBy?: ResponseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResponseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResponseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Response model
   */
  readonly fields: ResponseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Response.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResponseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    aboutUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    answeredByUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    question<T extends QuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionDefaultArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Response model
   */
  interface ResponseFieldRefs {
    readonly id: FieldRef<"Response", 'String'>
    readonly questionId: FieldRef<"Response", 'String'>
    readonly answeredById: FieldRef<"Response", 'String'>
    readonly aboutUserId: FieldRef<"Response", 'String'>
    readonly answer: FieldRef<"Response", 'String'>
    readonly notSure: FieldRef<"Response", 'Boolean'>
    readonly responseTime: FieldRef<"Response", 'Int'>
    readonly qualityScore: FieldRef<"Response", 'Float'>
    readonly flaggedMalicious: FieldRef<"Response", 'Boolean'>
    readonly createdAt: FieldRef<"Response", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Response findUnique
   */
  export type ResponseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response findUniqueOrThrow
   */
  export type ResponseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response findFirst
   */
  export type ResponseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Responses.
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Responses.
     */
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Response findFirstOrThrow
   */
  export type ResponseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Responses.
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Responses.
     */
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Response findMany
   */
  export type ResponseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Responses to fetch.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Responses.
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Response create
   */
  export type ResponseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * The data needed to create a Response.
     */
    data: XOR<ResponseCreateInput, ResponseUncheckedCreateInput>
  }

  /**
   * Response createMany
   */
  export type ResponseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Responses.
     */
    data: ResponseCreateManyInput | ResponseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Response createManyAndReturn
   */
  export type ResponseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * The data used to create many Responses.
     */
    data: ResponseCreateManyInput | ResponseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Response update
   */
  export type ResponseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * The data needed to update a Response.
     */
    data: XOR<ResponseUpdateInput, ResponseUncheckedUpdateInput>
    /**
     * Choose, which Response to update.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response updateMany
   */
  export type ResponseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Responses.
     */
    data: XOR<ResponseUpdateManyMutationInput, ResponseUncheckedUpdateManyInput>
    /**
     * Filter which Responses to update
     */
    where?: ResponseWhereInput
  }

  /**
   * Response upsert
   */
  export type ResponseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * The filter to search for the Response to update in case it exists.
     */
    where: ResponseWhereUniqueInput
    /**
     * In case the Response found by the `where` argument doesn't exist, create a new Response with this data.
     */
    create: XOR<ResponseCreateInput, ResponseUncheckedCreateInput>
    /**
     * In case the Response was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResponseUpdateInput, ResponseUncheckedUpdateInput>
  }

  /**
   * Response delete
   */
  export type ResponseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter which Response to delete.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response deleteMany
   */
  export type ResponseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Responses to delete
     */
    where?: ResponseWhereInput
  }

  /**
   * Response without action
   */
  export type ResponseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
  }


  /**
   * Model InviteLink
   */

  export type AggregateInviteLink = {
    _count: InviteLinkCountAggregateOutputType | null
    _min: InviteLinkMinAggregateOutputType | null
    _max: InviteLinkMaxAggregateOutputType | null
  }

  export type InviteLinkMinAggregateOutputType = {
    id: string | null
    inviteCode: string | null
    inviterId: string | null
    targetId: string | null
    status: string | null
    expiresAt: Date | null
    completedAt: Date | null
    friendEmail: string | null
    friendNickname: string | null
    relationshipType: string | null
    openedAt: Date | null
    startedAt: Date | null
    abandonedAt: Date | null
    deviceType: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InviteLinkMaxAggregateOutputType = {
    id: string | null
    inviteCode: string | null
    inviterId: string | null
    targetId: string | null
    status: string | null
    expiresAt: Date | null
    completedAt: Date | null
    friendEmail: string | null
    friendNickname: string | null
    relationshipType: string | null
    openedAt: Date | null
    startedAt: Date | null
    abandonedAt: Date | null
    deviceType: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InviteLinkCountAggregateOutputType = {
    id: number
    inviteCode: number
    inviterId: number
    targetId: number
    status: number
    expiresAt: number
    completedAt: number
    friendEmail: number
    friendNickname: number
    relationshipType: number
    openedAt: number
    startedAt: number
    abandonedAt: number
    deviceType: number
    ipAddress: number
    userAgent: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InviteLinkMinAggregateInputType = {
    id?: true
    inviteCode?: true
    inviterId?: true
    targetId?: true
    status?: true
    expiresAt?: true
    completedAt?: true
    friendEmail?: true
    friendNickname?: true
    relationshipType?: true
    openedAt?: true
    startedAt?: true
    abandonedAt?: true
    deviceType?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InviteLinkMaxAggregateInputType = {
    id?: true
    inviteCode?: true
    inviterId?: true
    targetId?: true
    status?: true
    expiresAt?: true
    completedAt?: true
    friendEmail?: true
    friendNickname?: true
    relationshipType?: true
    openedAt?: true
    startedAt?: true
    abandonedAt?: true
    deviceType?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InviteLinkCountAggregateInputType = {
    id?: true
    inviteCode?: true
    inviterId?: true
    targetId?: true
    status?: true
    expiresAt?: true
    completedAt?: true
    friendEmail?: true
    friendNickname?: true
    relationshipType?: true
    openedAt?: true
    startedAt?: true
    abandonedAt?: true
    deviceType?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InviteLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InviteLink to aggregate.
     */
    where?: InviteLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteLinks to fetch.
     */
    orderBy?: InviteLinkOrderByWithRelationInput | InviteLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InviteLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InviteLinks
    **/
    _count?: true | InviteLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InviteLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InviteLinkMaxAggregateInputType
  }

  export type GetInviteLinkAggregateType<T extends InviteLinkAggregateArgs> = {
        [P in keyof T & keyof AggregateInviteLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInviteLink[P]>
      : GetScalarType<T[P], AggregateInviteLink[P]>
  }




  export type InviteLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InviteLinkWhereInput
    orderBy?: InviteLinkOrderByWithAggregationInput | InviteLinkOrderByWithAggregationInput[]
    by: InviteLinkScalarFieldEnum[] | InviteLinkScalarFieldEnum
    having?: InviteLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InviteLinkCountAggregateInputType | true
    _min?: InviteLinkMinAggregateInputType
    _max?: InviteLinkMaxAggregateInputType
  }

  export type InviteLinkGroupByOutputType = {
    id: string
    inviteCode: string
    inviterId: string
    targetId: string | null
    status: string
    expiresAt: Date
    completedAt: Date | null
    friendEmail: string | null
    friendNickname: string | null
    relationshipType: string | null
    openedAt: Date | null
    startedAt: Date | null
    abandonedAt: Date | null
    deviceType: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date
    updatedAt: Date
    _count: InviteLinkCountAggregateOutputType | null
    _min: InviteLinkMinAggregateOutputType | null
    _max: InviteLinkMaxAggregateOutputType | null
  }

  type GetInviteLinkGroupByPayload<T extends InviteLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InviteLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InviteLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InviteLinkGroupByOutputType[P]>
            : GetScalarType<T[P], InviteLinkGroupByOutputType[P]>
        }
      >
    >


  export type InviteLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inviteCode?: boolean
    inviterId?: boolean
    targetId?: boolean
    status?: boolean
    expiresAt?: boolean
    completedAt?: boolean
    friendEmail?: boolean
    friendNickname?: boolean
    relationshipType?: boolean
    openedAt?: boolean
    startedAt?: boolean
    abandonedAt?: boolean
    deviceType?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inviter?: boolean | UserDefaultArgs<ExtArgs>
    target?: boolean | InviteLink$targetArgs<ExtArgs>
  }, ExtArgs["result"]["inviteLink"]>

  export type InviteLinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inviteCode?: boolean
    inviterId?: boolean
    targetId?: boolean
    status?: boolean
    expiresAt?: boolean
    completedAt?: boolean
    friendEmail?: boolean
    friendNickname?: boolean
    relationshipType?: boolean
    openedAt?: boolean
    startedAt?: boolean
    abandonedAt?: boolean
    deviceType?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inviter?: boolean | UserDefaultArgs<ExtArgs>
    target?: boolean | InviteLink$targetArgs<ExtArgs>
  }, ExtArgs["result"]["inviteLink"]>


  export type InviteLinkSelectScalar = {
    id?: boolean
    inviteCode?: boolean
    inviterId?: boolean
    targetId?: boolean
    status?: boolean
    expiresAt?: boolean
    completedAt?: boolean
    friendEmail?: boolean
    friendNickname?: boolean
    relationshipType?: boolean
    openedAt?: boolean
    startedAt?: boolean
    abandonedAt?: boolean
    deviceType?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InviteLinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "inviteCode" | "inviterId" | "targetId" | "status" | "expiresAt" | "completedAt" | "friendEmail" | "friendNickname" | "relationshipType" | "openedAt" | "startedAt" | "abandonedAt" | "deviceType" | "ipAddress" | "userAgent" | "createdAt" | "updatedAt", ExtArgs["result"]["inviteLink"]>
  export type InviteLinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inviter?: boolean | UserDefaultArgs<ExtArgs>
    target?: boolean | InviteLink$targetArgs<ExtArgs>
  }
  export type InviteLinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inviter?: boolean | UserDefaultArgs<ExtArgs>
    target?: boolean | InviteLink$targetArgs<ExtArgs>
  }

  export type $InviteLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InviteLink"
    objects: {
      inviter: Prisma.$UserPayload<ExtArgs>
      target: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      inviteCode: string
      inviterId: string
      targetId: string | null
      status: string
      expiresAt: Date
      completedAt: Date | null
      friendEmail: string | null
      friendNickname: string | null
      relationshipType: string | null
      openedAt: Date | null
      startedAt: Date | null
      abandonedAt: Date | null
      deviceType: string | null
      ipAddress: string | null
      userAgent: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["inviteLink"]>
    composites: {}
  }

  type InviteLinkGetPayload<S extends boolean | null | undefined | InviteLinkDefaultArgs> = $Result.GetResult<Prisma.$InviteLinkPayload, S>

  type InviteLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InviteLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InviteLinkCountAggregateInputType | true
    }

  export interface InviteLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InviteLink'], meta: { name: 'InviteLink' } }
    /**
     * Find zero or one InviteLink that matches the filter.
     * @param {InviteLinkFindUniqueArgs} args - Arguments to find a InviteLink
     * @example
     * // Get one InviteLink
     * const inviteLink = await prisma.inviteLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InviteLinkFindUniqueArgs>(args: SelectSubset<T, InviteLinkFindUniqueArgs<ExtArgs>>): Prisma__InviteLinkClient<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InviteLink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InviteLinkFindUniqueOrThrowArgs} args - Arguments to find a InviteLink
     * @example
     * // Get one InviteLink
     * const inviteLink = await prisma.inviteLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InviteLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, InviteLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InviteLinkClient<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InviteLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteLinkFindFirstArgs} args - Arguments to find a InviteLink
     * @example
     * // Get one InviteLink
     * const inviteLink = await prisma.inviteLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InviteLinkFindFirstArgs>(args?: SelectSubset<T, InviteLinkFindFirstArgs<ExtArgs>>): Prisma__InviteLinkClient<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InviteLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteLinkFindFirstOrThrowArgs} args - Arguments to find a InviteLink
     * @example
     * // Get one InviteLink
     * const inviteLink = await prisma.inviteLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InviteLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, InviteLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__InviteLinkClient<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InviteLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InviteLinks
     * const inviteLinks = await prisma.inviteLink.findMany()
     * 
     * // Get first 10 InviteLinks
     * const inviteLinks = await prisma.inviteLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inviteLinkWithIdOnly = await prisma.inviteLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InviteLinkFindManyArgs>(args?: SelectSubset<T, InviteLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InviteLink.
     * @param {InviteLinkCreateArgs} args - Arguments to create a InviteLink.
     * @example
     * // Create one InviteLink
     * const InviteLink = await prisma.inviteLink.create({
     *   data: {
     *     // ... data to create a InviteLink
     *   }
     * })
     * 
     */
    create<T extends InviteLinkCreateArgs>(args: SelectSubset<T, InviteLinkCreateArgs<ExtArgs>>): Prisma__InviteLinkClient<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InviteLinks.
     * @param {InviteLinkCreateManyArgs} args - Arguments to create many InviteLinks.
     * @example
     * // Create many InviteLinks
     * const inviteLink = await prisma.inviteLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InviteLinkCreateManyArgs>(args?: SelectSubset<T, InviteLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InviteLinks and returns the data saved in the database.
     * @param {InviteLinkCreateManyAndReturnArgs} args - Arguments to create many InviteLinks.
     * @example
     * // Create many InviteLinks
     * const inviteLink = await prisma.inviteLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InviteLinks and only return the `id`
     * const inviteLinkWithIdOnly = await prisma.inviteLink.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InviteLinkCreateManyAndReturnArgs>(args?: SelectSubset<T, InviteLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InviteLink.
     * @param {InviteLinkDeleteArgs} args - Arguments to delete one InviteLink.
     * @example
     * // Delete one InviteLink
     * const InviteLink = await prisma.inviteLink.delete({
     *   where: {
     *     // ... filter to delete one InviteLink
     *   }
     * })
     * 
     */
    delete<T extends InviteLinkDeleteArgs>(args: SelectSubset<T, InviteLinkDeleteArgs<ExtArgs>>): Prisma__InviteLinkClient<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InviteLink.
     * @param {InviteLinkUpdateArgs} args - Arguments to update one InviteLink.
     * @example
     * // Update one InviteLink
     * const inviteLink = await prisma.inviteLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InviteLinkUpdateArgs>(args: SelectSubset<T, InviteLinkUpdateArgs<ExtArgs>>): Prisma__InviteLinkClient<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InviteLinks.
     * @param {InviteLinkDeleteManyArgs} args - Arguments to filter InviteLinks to delete.
     * @example
     * // Delete a few InviteLinks
     * const { count } = await prisma.inviteLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InviteLinkDeleteManyArgs>(args?: SelectSubset<T, InviteLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InviteLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InviteLinks
     * const inviteLink = await prisma.inviteLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InviteLinkUpdateManyArgs>(args: SelectSubset<T, InviteLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InviteLink.
     * @param {InviteLinkUpsertArgs} args - Arguments to update or create a InviteLink.
     * @example
     * // Update or create a InviteLink
     * const inviteLink = await prisma.inviteLink.upsert({
     *   create: {
     *     // ... data to create a InviteLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InviteLink we want to update
     *   }
     * })
     */
    upsert<T extends InviteLinkUpsertArgs>(args: SelectSubset<T, InviteLinkUpsertArgs<ExtArgs>>): Prisma__InviteLinkClient<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InviteLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteLinkCountArgs} args - Arguments to filter InviteLinks to count.
     * @example
     * // Count the number of InviteLinks
     * const count = await prisma.inviteLink.count({
     *   where: {
     *     // ... the filter for the InviteLinks we want to count
     *   }
     * })
    **/
    count<T extends InviteLinkCountArgs>(
      args?: Subset<T, InviteLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InviteLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InviteLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InviteLinkAggregateArgs>(args: Subset<T, InviteLinkAggregateArgs>): Prisma.PrismaPromise<GetInviteLinkAggregateType<T>>

    /**
     * Group by InviteLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteLinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InviteLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InviteLinkGroupByArgs['orderBy'] }
        : { orderBy?: InviteLinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InviteLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInviteLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InviteLink model
   */
  readonly fields: InviteLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InviteLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InviteLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inviter<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    target<T extends InviteLink$targetArgs<ExtArgs> = {}>(args?: Subset<T, InviteLink$targetArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InviteLink model
   */
  interface InviteLinkFieldRefs {
    readonly id: FieldRef<"InviteLink", 'String'>
    readonly inviteCode: FieldRef<"InviteLink", 'String'>
    readonly inviterId: FieldRef<"InviteLink", 'String'>
    readonly targetId: FieldRef<"InviteLink", 'String'>
    readonly status: FieldRef<"InviteLink", 'String'>
    readonly expiresAt: FieldRef<"InviteLink", 'DateTime'>
    readonly completedAt: FieldRef<"InviteLink", 'DateTime'>
    readonly friendEmail: FieldRef<"InviteLink", 'String'>
    readonly friendNickname: FieldRef<"InviteLink", 'String'>
    readonly relationshipType: FieldRef<"InviteLink", 'String'>
    readonly openedAt: FieldRef<"InviteLink", 'DateTime'>
    readonly startedAt: FieldRef<"InviteLink", 'DateTime'>
    readonly abandonedAt: FieldRef<"InviteLink", 'DateTime'>
    readonly deviceType: FieldRef<"InviteLink", 'String'>
    readonly ipAddress: FieldRef<"InviteLink", 'String'>
    readonly userAgent: FieldRef<"InviteLink", 'String'>
    readonly createdAt: FieldRef<"InviteLink", 'DateTime'>
    readonly updatedAt: FieldRef<"InviteLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InviteLink findUnique
   */
  export type InviteLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * Filter, which InviteLink to fetch.
     */
    where: InviteLinkWhereUniqueInput
  }

  /**
   * InviteLink findUniqueOrThrow
   */
  export type InviteLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * Filter, which InviteLink to fetch.
     */
    where: InviteLinkWhereUniqueInput
  }

  /**
   * InviteLink findFirst
   */
  export type InviteLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * Filter, which InviteLink to fetch.
     */
    where?: InviteLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteLinks to fetch.
     */
    orderBy?: InviteLinkOrderByWithRelationInput | InviteLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InviteLinks.
     */
    cursor?: InviteLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InviteLinks.
     */
    distinct?: InviteLinkScalarFieldEnum | InviteLinkScalarFieldEnum[]
  }

  /**
   * InviteLink findFirstOrThrow
   */
  export type InviteLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * Filter, which InviteLink to fetch.
     */
    where?: InviteLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteLinks to fetch.
     */
    orderBy?: InviteLinkOrderByWithRelationInput | InviteLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InviteLinks.
     */
    cursor?: InviteLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InviteLinks.
     */
    distinct?: InviteLinkScalarFieldEnum | InviteLinkScalarFieldEnum[]
  }

  /**
   * InviteLink findMany
   */
  export type InviteLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * Filter, which InviteLinks to fetch.
     */
    where?: InviteLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteLinks to fetch.
     */
    orderBy?: InviteLinkOrderByWithRelationInput | InviteLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InviteLinks.
     */
    cursor?: InviteLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteLinks.
     */
    skip?: number
    distinct?: InviteLinkScalarFieldEnum | InviteLinkScalarFieldEnum[]
  }

  /**
   * InviteLink create
   */
  export type InviteLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * The data needed to create a InviteLink.
     */
    data: XOR<InviteLinkCreateInput, InviteLinkUncheckedCreateInput>
  }

  /**
   * InviteLink createMany
   */
  export type InviteLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InviteLinks.
     */
    data: InviteLinkCreateManyInput | InviteLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InviteLink createManyAndReturn
   */
  export type InviteLinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * The data used to create many InviteLinks.
     */
    data: InviteLinkCreateManyInput | InviteLinkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InviteLink update
   */
  export type InviteLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * The data needed to update a InviteLink.
     */
    data: XOR<InviteLinkUpdateInput, InviteLinkUncheckedUpdateInput>
    /**
     * Choose, which InviteLink to update.
     */
    where: InviteLinkWhereUniqueInput
  }

  /**
   * InviteLink updateMany
   */
  export type InviteLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InviteLinks.
     */
    data: XOR<InviteLinkUpdateManyMutationInput, InviteLinkUncheckedUpdateManyInput>
    /**
     * Filter which InviteLinks to update
     */
    where?: InviteLinkWhereInput
  }

  /**
   * InviteLink upsert
   */
  export type InviteLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * The filter to search for the InviteLink to update in case it exists.
     */
    where: InviteLinkWhereUniqueInput
    /**
     * In case the InviteLink found by the `where` argument doesn't exist, create a new InviteLink with this data.
     */
    create: XOR<InviteLinkCreateInput, InviteLinkUncheckedCreateInput>
    /**
     * In case the InviteLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InviteLinkUpdateInput, InviteLinkUncheckedUpdateInput>
  }

  /**
   * InviteLink delete
   */
  export type InviteLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * Filter which InviteLink to delete.
     */
    where: InviteLinkWhereUniqueInput
  }

  /**
   * InviteLink deleteMany
   */
  export type InviteLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InviteLinks to delete
     */
    where?: InviteLinkWhereInput
  }

  /**
   * InviteLink.target
   */
  export type InviteLink$targetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * InviteLink without action
   */
  export type InviteLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
  }


  /**
   * Model RateLimit
   */

  export type AggregateRateLimit = {
    _count: RateLimitCountAggregateOutputType | null
    _avg: RateLimitAvgAggregateOutputType | null
    _sum: RateLimitSumAggregateOutputType | null
    _min: RateLimitMinAggregateOutputType | null
    _max: RateLimitMaxAggregateOutputType | null
  }

  export type RateLimitAvgAggregateOutputType = {
    invitesSent: number | null
  }

  export type RateLimitSumAggregateOutputType = {
    invitesSent: number | null
  }

  export type RateLimitMinAggregateOutputType = {
    id: string | null
    userId: string | null
    invitesSent: number | null
    windowStart: Date | null
    windowEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RateLimitMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    invitesSent: number | null
    windowStart: Date | null
    windowEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RateLimitCountAggregateOutputType = {
    id: number
    userId: number
    invitesSent: number
    windowStart: number
    windowEnd: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RateLimitAvgAggregateInputType = {
    invitesSent?: true
  }

  export type RateLimitSumAggregateInputType = {
    invitesSent?: true
  }

  export type RateLimitMinAggregateInputType = {
    id?: true
    userId?: true
    invitesSent?: true
    windowStart?: true
    windowEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RateLimitMaxAggregateInputType = {
    id?: true
    userId?: true
    invitesSent?: true
    windowStart?: true
    windowEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RateLimitCountAggregateInputType = {
    id?: true
    userId?: true
    invitesSent?: true
    windowStart?: true
    windowEnd?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RateLimitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RateLimit to aggregate.
     */
    where?: RateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimits to fetch.
     */
    orderBy?: RateLimitOrderByWithRelationInput | RateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RateLimits
    **/
    _count?: true | RateLimitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RateLimitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RateLimitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RateLimitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RateLimitMaxAggregateInputType
  }

  export type GetRateLimitAggregateType<T extends RateLimitAggregateArgs> = {
        [P in keyof T & keyof AggregateRateLimit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRateLimit[P]>
      : GetScalarType<T[P], AggregateRateLimit[P]>
  }




  export type RateLimitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RateLimitWhereInput
    orderBy?: RateLimitOrderByWithAggregationInput | RateLimitOrderByWithAggregationInput[]
    by: RateLimitScalarFieldEnum[] | RateLimitScalarFieldEnum
    having?: RateLimitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RateLimitCountAggregateInputType | true
    _avg?: RateLimitAvgAggregateInputType
    _sum?: RateLimitSumAggregateInputType
    _min?: RateLimitMinAggregateInputType
    _max?: RateLimitMaxAggregateInputType
  }

  export type RateLimitGroupByOutputType = {
    id: string
    userId: string
    invitesSent: number
    windowStart: Date
    windowEnd: Date
    createdAt: Date
    updatedAt: Date
    _count: RateLimitCountAggregateOutputType | null
    _avg: RateLimitAvgAggregateOutputType | null
    _sum: RateLimitSumAggregateOutputType | null
    _min: RateLimitMinAggregateOutputType | null
    _max: RateLimitMaxAggregateOutputType | null
  }

  type GetRateLimitGroupByPayload<T extends RateLimitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RateLimitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RateLimitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RateLimitGroupByOutputType[P]>
            : GetScalarType<T[P], RateLimitGroupByOutputType[P]>
        }
      >
    >


  export type RateLimitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    invitesSent?: boolean
    windowStart?: boolean
    windowEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rateLimit"]>

  export type RateLimitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    invitesSent?: boolean
    windowStart?: boolean
    windowEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rateLimit"]>


  export type RateLimitSelectScalar = {
    id?: boolean
    userId?: boolean
    invitesSent?: boolean
    windowStart?: boolean
    windowEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RateLimitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "invitesSent" | "windowStart" | "windowEnd" | "createdAt" | "updatedAt", ExtArgs["result"]["rateLimit"]>

  export type $RateLimitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RateLimit"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      invitesSent: number
      windowStart: Date
      windowEnd: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rateLimit"]>
    composites: {}
  }

  type RateLimitGetPayload<S extends boolean | null | undefined | RateLimitDefaultArgs> = $Result.GetResult<Prisma.$RateLimitPayload, S>

  type RateLimitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RateLimitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RateLimitCountAggregateInputType | true
    }

  export interface RateLimitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RateLimit'], meta: { name: 'RateLimit' } }
    /**
     * Find zero or one RateLimit that matches the filter.
     * @param {RateLimitFindUniqueArgs} args - Arguments to find a RateLimit
     * @example
     * // Get one RateLimit
     * const rateLimit = await prisma.rateLimit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RateLimitFindUniqueArgs>(args: SelectSubset<T, RateLimitFindUniqueArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RateLimit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RateLimitFindUniqueOrThrowArgs} args - Arguments to find a RateLimit
     * @example
     * // Get one RateLimit
     * const rateLimit = await prisma.rateLimit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RateLimitFindUniqueOrThrowArgs>(args: SelectSubset<T, RateLimitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RateLimit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitFindFirstArgs} args - Arguments to find a RateLimit
     * @example
     * // Get one RateLimit
     * const rateLimit = await prisma.rateLimit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RateLimitFindFirstArgs>(args?: SelectSubset<T, RateLimitFindFirstArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RateLimit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitFindFirstOrThrowArgs} args - Arguments to find a RateLimit
     * @example
     * // Get one RateLimit
     * const rateLimit = await prisma.rateLimit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RateLimitFindFirstOrThrowArgs>(args?: SelectSubset<T, RateLimitFindFirstOrThrowArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RateLimits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RateLimits
     * const rateLimits = await prisma.rateLimit.findMany()
     * 
     * // Get first 10 RateLimits
     * const rateLimits = await prisma.rateLimit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rateLimitWithIdOnly = await prisma.rateLimit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RateLimitFindManyArgs>(args?: SelectSubset<T, RateLimitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RateLimit.
     * @param {RateLimitCreateArgs} args - Arguments to create a RateLimit.
     * @example
     * // Create one RateLimit
     * const RateLimit = await prisma.rateLimit.create({
     *   data: {
     *     // ... data to create a RateLimit
     *   }
     * })
     * 
     */
    create<T extends RateLimitCreateArgs>(args: SelectSubset<T, RateLimitCreateArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RateLimits.
     * @param {RateLimitCreateManyArgs} args - Arguments to create many RateLimits.
     * @example
     * // Create many RateLimits
     * const rateLimit = await prisma.rateLimit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RateLimitCreateManyArgs>(args?: SelectSubset<T, RateLimitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RateLimits and returns the data saved in the database.
     * @param {RateLimitCreateManyAndReturnArgs} args - Arguments to create many RateLimits.
     * @example
     * // Create many RateLimits
     * const rateLimit = await prisma.rateLimit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RateLimits and only return the `id`
     * const rateLimitWithIdOnly = await prisma.rateLimit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RateLimitCreateManyAndReturnArgs>(args?: SelectSubset<T, RateLimitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RateLimit.
     * @param {RateLimitDeleteArgs} args - Arguments to delete one RateLimit.
     * @example
     * // Delete one RateLimit
     * const RateLimit = await prisma.rateLimit.delete({
     *   where: {
     *     // ... filter to delete one RateLimit
     *   }
     * })
     * 
     */
    delete<T extends RateLimitDeleteArgs>(args: SelectSubset<T, RateLimitDeleteArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RateLimit.
     * @param {RateLimitUpdateArgs} args - Arguments to update one RateLimit.
     * @example
     * // Update one RateLimit
     * const rateLimit = await prisma.rateLimit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RateLimitUpdateArgs>(args: SelectSubset<T, RateLimitUpdateArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RateLimits.
     * @param {RateLimitDeleteManyArgs} args - Arguments to filter RateLimits to delete.
     * @example
     * // Delete a few RateLimits
     * const { count } = await prisma.rateLimit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RateLimitDeleteManyArgs>(args?: SelectSubset<T, RateLimitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RateLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RateLimits
     * const rateLimit = await prisma.rateLimit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RateLimitUpdateManyArgs>(args: SelectSubset<T, RateLimitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RateLimit.
     * @param {RateLimitUpsertArgs} args - Arguments to update or create a RateLimit.
     * @example
     * // Update or create a RateLimit
     * const rateLimit = await prisma.rateLimit.upsert({
     *   create: {
     *     // ... data to create a RateLimit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RateLimit we want to update
     *   }
     * })
     */
    upsert<T extends RateLimitUpsertArgs>(args: SelectSubset<T, RateLimitUpsertArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RateLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitCountArgs} args - Arguments to filter RateLimits to count.
     * @example
     * // Count the number of RateLimits
     * const count = await prisma.rateLimit.count({
     *   where: {
     *     // ... the filter for the RateLimits we want to count
     *   }
     * })
    **/
    count<T extends RateLimitCountArgs>(
      args?: Subset<T, RateLimitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RateLimitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RateLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RateLimitAggregateArgs>(args: Subset<T, RateLimitAggregateArgs>): Prisma.PrismaPromise<GetRateLimitAggregateType<T>>

    /**
     * Group by RateLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RateLimitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RateLimitGroupByArgs['orderBy'] }
        : { orderBy?: RateLimitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RateLimitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRateLimitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RateLimit model
   */
  readonly fields: RateLimitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RateLimit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RateLimitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RateLimit model
   */
  interface RateLimitFieldRefs {
    readonly id: FieldRef<"RateLimit", 'String'>
    readonly userId: FieldRef<"RateLimit", 'String'>
    readonly invitesSent: FieldRef<"RateLimit", 'Int'>
    readonly windowStart: FieldRef<"RateLimit", 'DateTime'>
    readonly windowEnd: FieldRef<"RateLimit", 'DateTime'>
    readonly createdAt: FieldRef<"RateLimit", 'DateTime'>
    readonly updatedAt: FieldRef<"RateLimit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RateLimit findUnique
   */
  export type RateLimitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * Filter, which RateLimit to fetch.
     */
    where: RateLimitWhereUniqueInput
  }

  /**
   * RateLimit findUniqueOrThrow
   */
  export type RateLimitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * Filter, which RateLimit to fetch.
     */
    where: RateLimitWhereUniqueInput
  }

  /**
   * RateLimit findFirst
   */
  export type RateLimitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * Filter, which RateLimit to fetch.
     */
    where?: RateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimits to fetch.
     */
    orderBy?: RateLimitOrderByWithRelationInput | RateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RateLimits.
     */
    cursor?: RateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RateLimits.
     */
    distinct?: RateLimitScalarFieldEnum | RateLimitScalarFieldEnum[]
  }

  /**
   * RateLimit findFirstOrThrow
   */
  export type RateLimitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * Filter, which RateLimit to fetch.
     */
    where?: RateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimits to fetch.
     */
    orderBy?: RateLimitOrderByWithRelationInput | RateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RateLimits.
     */
    cursor?: RateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RateLimits.
     */
    distinct?: RateLimitScalarFieldEnum | RateLimitScalarFieldEnum[]
  }

  /**
   * RateLimit findMany
   */
  export type RateLimitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * Filter, which RateLimits to fetch.
     */
    where?: RateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimits to fetch.
     */
    orderBy?: RateLimitOrderByWithRelationInput | RateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RateLimits.
     */
    cursor?: RateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimits.
     */
    skip?: number
    distinct?: RateLimitScalarFieldEnum | RateLimitScalarFieldEnum[]
  }

  /**
   * RateLimit create
   */
  export type RateLimitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * The data needed to create a RateLimit.
     */
    data: XOR<RateLimitCreateInput, RateLimitUncheckedCreateInput>
  }

  /**
   * RateLimit createMany
   */
  export type RateLimitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RateLimits.
     */
    data: RateLimitCreateManyInput | RateLimitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RateLimit createManyAndReturn
   */
  export type RateLimitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * The data used to create many RateLimits.
     */
    data: RateLimitCreateManyInput | RateLimitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RateLimit update
   */
  export type RateLimitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * The data needed to update a RateLimit.
     */
    data: XOR<RateLimitUpdateInput, RateLimitUncheckedUpdateInput>
    /**
     * Choose, which RateLimit to update.
     */
    where: RateLimitWhereUniqueInput
  }

  /**
   * RateLimit updateMany
   */
  export type RateLimitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RateLimits.
     */
    data: XOR<RateLimitUpdateManyMutationInput, RateLimitUncheckedUpdateManyInput>
    /**
     * Filter which RateLimits to update
     */
    where?: RateLimitWhereInput
  }

  /**
   * RateLimit upsert
   */
  export type RateLimitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * The filter to search for the RateLimit to update in case it exists.
     */
    where: RateLimitWhereUniqueInput
    /**
     * In case the RateLimit found by the `where` argument doesn't exist, create a new RateLimit with this data.
     */
    create: XOR<RateLimitCreateInput, RateLimitUncheckedCreateInput>
    /**
     * In case the RateLimit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RateLimitUpdateInput, RateLimitUncheckedUpdateInput>
  }

  /**
   * RateLimit delete
   */
  export type RateLimitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
    /**
     * Filter which RateLimit to delete.
     */
    where: RateLimitWhereUniqueInput
  }

  /**
   * RateLimit deleteMany
   */
  export type RateLimitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RateLimits to delete
     */
    where?: RateLimitWhereInput
  }

  /**
   * RateLimit without action
   */
  export type RateLimitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimit
     */
    omit?: RateLimitOmit<ExtArgs> | null
  }


  /**
   * Model AssessmentSession
   */

  export type AggregateAssessmentSession = {
    _count: AssessmentSessionCountAggregateOutputType | null
    _avg: AssessmentSessionAvgAggregateOutputType | null
    _sum: AssessmentSessionSumAggregateOutputType | null
    _min: AssessmentSessionMinAggregateOutputType | null
    _max: AssessmentSessionMaxAggregateOutputType | null
  }

  export type AssessmentSessionAvgAggregateOutputType = {
    backNavigationCount: number | null
  }

  export type AssessmentSessionSumAggregateOutputType = {
    backNavigationCount: number | null
  }

  export type AssessmentSessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    clerkUserId: string | null
    status: string | null
    isCurrent: boolean | null
    backNavigationCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
    archivedAt: Date | null
  }

  export type AssessmentSessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    clerkUserId: string | null
    status: string | null
    isCurrent: boolean | null
    backNavigationCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
    archivedAt: Date | null
  }

  export type AssessmentSessionCountAggregateOutputType = {
    id: number
    userId: number
    clerkUserId: number
    status: number
    isCurrent: number
    responses: number
    demographics: number
    pendingQuestions: number
    answerHistory: number
    backNavigationCount: number
    backNavigationLog: number
    metadata: number
    createdAt: number
    updatedAt: number
    completedAt: number
    archivedAt: number
    _all: number
  }


  export type AssessmentSessionAvgAggregateInputType = {
    backNavigationCount?: true
  }

  export type AssessmentSessionSumAggregateInputType = {
    backNavigationCount?: true
  }

  export type AssessmentSessionMinAggregateInputType = {
    id?: true
    userId?: true
    clerkUserId?: true
    status?: true
    isCurrent?: true
    backNavigationCount?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    archivedAt?: true
  }

  export type AssessmentSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    clerkUserId?: true
    status?: true
    isCurrent?: true
    backNavigationCount?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    archivedAt?: true
  }

  export type AssessmentSessionCountAggregateInputType = {
    id?: true
    userId?: true
    clerkUserId?: true
    status?: true
    isCurrent?: true
    responses?: true
    demographics?: true
    pendingQuestions?: true
    answerHistory?: true
    backNavigationCount?: true
    backNavigationLog?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    archivedAt?: true
    _all?: true
  }

  export type AssessmentSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentSession to aggregate.
     */
    where?: AssessmentSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentSessions to fetch.
     */
    orderBy?: AssessmentSessionOrderByWithRelationInput | AssessmentSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssessmentSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssessmentSessions
    **/
    _count?: true | AssessmentSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssessmentSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssessmentSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssessmentSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssessmentSessionMaxAggregateInputType
  }

  export type GetAssessmentSessionAggregateType<T extends AssessmentSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateAssessmentSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssessmentSession[P]>
      : GetScalarType<T[P], AggregateAssessmentSession[P]>
  }




  export type AssessmentSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentSessionWhereInput
    orderBy?: AssessmentSessionOrderByWithAggregationInput | AssessmentSessionOrderByWithAggregationInput[]
    by: AssessmentSessionScalarFieldEnum[] | AssessmentSessionScalarFieldEnum
    having?: AssessmentSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssessmentSessionCountAggregateInputType | true
    _avg?: AssessmentSessionAvgAggregateInputType
    _sum?: AssessmentSessionSumAggregateInputType
    _min?: AssessmentSessionMinAggregateInputType
    _max?: AssessmentSessionMaxAggregateInputType
  }

  export type AssessmentSessionGroupByOutputType = {
    id: string
    userId: string | null
    clerkUserId: string | null
    status: string
    isCurrent: boolean
    responses: JsonValue
    demographics: JsonValue | null
    pendingQuestions: JsonValue | null
    answerHistory: JsonValue | null
    backNavigationCount: number
    backNavigationLog: JsonValue | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    completedAt: Date | null
    archivedAt: Date | null
    _count: AssessmentSessionCountAggregateOutputType | null
    _avg: AssessmentSessionAvgAggregateOutputType | null
    _sum: AssessmentSessionSumAggregateOutputType | null
    _min: AssessmentSessionMinAggregateOutputType | null
    _max: AssessmentSessionMaxAggregateOutputType | null
  }

  type GetAssessmentSessionGroupByPayload<T extends AssessmentSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssessmentSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssessmentSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssessmentSessionGroupByOutputType[P]>
            : GetScalarType<T[P], AssessmentSessionGroupByOutputType[P]>
        }
      >
    >


  export type AssessmentSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    clerkUserId?: boolean
    status?: boolean
    isCurrent?: boolean
    responses?: boolean
    demographics?: boolean
    pendingQuestions?: boolean
    answerHistory?: boolean
    backNavigationCount?: boolean
    backNavigationLog?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    archivedAt?: boolean
    result?: boolean | AssessmentSession$resultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentSession"]>

  export type AssessmentSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    clerkUserId?: boolean
    status?: boolean
    isCurrent?: boolean
    responses?: boolean
    demographics?: boolean
    pendingQuestions?: boolean
    answerHistory?: boolean
    backNavigationCount?: boolean
    backNavigationLog?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    archivedAt?: boolean
  }, ExtArgs["result"]["assessmentSession"]>


  export type AssessmentSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    clerkUserId?: boolean
    status?: boolean
    isCurrent?: boolean
    responses?: boolean
    demographics?: boolean
    pendingQuestions?: boolean
    answerHistory?: boolean
    backNavigationCount?: boolean
    backNavigationLog?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    archivedAt?: boolean
  }

  export type AssessmentSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "clerkUserId" | "status" | "isCurrent" | "responses" | "demographics" | "pendingQuestions" | "answerHistory" | "backNavigationCount" | "backNavigationLog" | "metadata" | "createdAt" | "updatedAt" | "completedAt" | "archivedAt", ExtArgs["result"]["assessmentSession"]>
  export type AssessmentSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    result?: boolean | AssessmentSession$resultArgs<ExtArgs>
  }
  export type AssessmentSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AssessmentSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssessmentSession"
    objects: {
      result: Prisma.$AssessmentResultPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      clerkUserId: string | null
      status: string
      isCurrent: boolean
      responses: Prisma.JsonValue
      demographics: Prisma.JsonValue | null
      pendingQuestions: Prisma.JsonValue | null
      answerHistory: Prisma.JsonValue | null
      backNavigationCount: number
      backNavigationLog: Prisma.JsonValue | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
      completedAt: Date | null
      archivedAt: Date | null
    }, ExtArgs["result"]["assessmentSession"]>
    composites: {}
  }

  type AssessmentSessionGetPayload<S extends boolean | null | undefined | AssessmentSessionDefaultArgs> = $Result.GetResult<Prisma.$AssessmentSessionPayload, S>

  type AssessmentSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssessmentSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssessmentSessionCountAggregateInputType | true
    }

  export interface AssessmentSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssessmentSession'], meta: { name: 'AssessmentSession' } }
    /**
     * Find zero or one AssessmentSession that matches the filter.
     * @param {AssessmentSessionFindUniqueArgs} args - Arguments to find a AssessmentSession
     * @example
     * // Get one AssessmentSession
     * const assessmentSession = await prisma.assessmentSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssessmentSessionFindUniqueArgs>(args: SelectSubset<T, AssessmentSessionFindUniqueArgs<ExtArgs>>): Prisma__AssessmentSessionClient<$Result.GetResult<Prisma.$AssessmentSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AssessmentSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssessmentSessionFindUniqueOrThrowArgs} args - Arguments to find a AssessmentSession
     * @example
     * // Get one AssessmentSession
     * const assessmentSession = await prisma.assessmentSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssessmentSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, AssessmentSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssessmentSessionClient<$Result.GetResult<Prisma.$AssessmentSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentSessionFindFirstArgs} args - Arguments to find a AssessmentSession
     * @example
     * // Get one AssessmentSession
     * const assessmentSession = await prisma.assessmentSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssessmentSessionFindFirstArgs>(args?: SelectSubset<T, AssessmentSessionFindFirstArgs<ExtArgs>>): Prisma__AssessmentSessionClient<$Result.GetResult<Prisma.$AssessmentSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentSessionFindFirstOrThrowArgs} args - Arguments to find a AssessmentSession
     * @example
     * // Get one AssessmentSession
     * const assessmentSession = await prisma.assessmentSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssessmentSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, AssessmentSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssessmentSessionClient<$Result.GetResult<Prisma.$AssessmentSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AssessmentSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssessmentSessions
     * const assessmentSessions = await prisma.assessmentSession.findMany()
     * 
     * // Get first 10 AssessmentSessions
     * const assessmentSessions = await prisma.assessmentSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assessmentSessionWithIdOnly = await prisma.assessmentSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssessmentSessionFindManyArgs>(args?: SelectSubset<T, AssessmentSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AssessmentSession.
     * @param {AssessmentSessionCreateArgs} args - Arguments to create a AssessmentSession.
     * @example
     * // Create one AssessmentSession
     * const AssessmentSession = await prisma.assessmentSession.create({
     *   data: {
     *     // ... data to create a AssessmentSession
     *   }
     * })
     * 
     */
    create<T extends AssessmentSessionCreateArgs>(args: SelectSubset<T, AssessmentSessionCreateArgs<ExtArgs>>): Prisma__AssessmentSessionClient<$Result.GetResult<Prisma.$AssessmentSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AssessmentSessions.
     * @param {AssessmentSessionCreateManyArgs} args - Arguments to create many AssessmentSessions.
     * @example
     * // Create many AssessmentSessions
     * const assessmentSession = await prisma.assessmentSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssessmentSessionCreateManyArgs>(args?: SelectSubset<T, AssessmentSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AssessmentSessions and returns the data saved in the database.
     * @param {AssessmentSessionCreateManyAndReturnArgs} args - Arguments to create many AssessmentSessions.
     * @example
     * // Create many AssessmentSessions
     * const assessmentSession = await prisma.assessmentSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AssessmentSessions and only return the `id`
     * const assessmentSessionWithIdOnly = await prisma.assessmentSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssessmentSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, AssessmentSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AssessmentSession.
     * @param {AssessmentSessionDeleteArgs} args - Arguments to delete one AssessmentSession.
     * @example
     * // Delete one AssessmentSession
     * const AssessmentSession = await prisma.assessmentSession.delete({
     *   where: {
     *     // ... filter to delete one AssessmentSession
     *   }
     * })
     * 
     */
    delete<T extends AssessmentSessionDeleteArgs>(args: SelectSubset<T, AssessmentSessionDeleteArgs<ExtArgs>>): Prisma__AssessmentSessionClient<$Result.GetResult<Prisma.$AssessmentSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AssessmentSession.
     * @param {AssessmentSessionUpdateArgs} args - Arguments to update one AssessmentSession.
     * @example
     * // Update one AssessmentSession
     * const assessmentSession = await prisma.assessmentSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssessmentSessionUpdateArgs>(args: SelectSubset<T, AssessmentSessionUpdateArgs<ExtArgs>>): Prisma__AssessmentSessionClient<$Result.GetResult<Prisma.$AssessmentSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AssessmentSessions.
     * @param {AssessmentSessionDeleteManyArgs} args - Arguments to filter AssessmentSessions to delete.
     * @example
     * // Delete a few AssessmentSessions
     * const { count } = await prisma.assessmentSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssessmentSessionDeleteManyArgs>(args?: SelectSubset<T, AssessmentSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssessmentSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssessmentSessions
     * const assessmentSession = await prisma.assessmentSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssessmentSessionUpdateManyArgs>(args: SelectSubset<T, AssessmentSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AssessmentSession.
     * @param {AssessmentSessionUpsertArgs} args - Arguments to update or create a AssessmentSession.
     * @example
     * // Update or create a AssessmentSession
     * const assessmentSession = await prisma.assessmentSession.upsert({
     *   create: {
     *     // ... data to create a AssessmentSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssessmentSession we want to update
     *   }
     * })
     */
    upsert<T extends AssessmentSessionUpsertArgs>(args: SelectSubset<T, AssessmentSessionUpsertArgs<ExtArgs>>): Prisma__AssessmentSessionClient<$Result.GetResult<Prisma.$AssessmentSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AssessmentSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentSessionCountArgs} args - Arguments to filter AssessmentSessions to count.
     * @example
     * // Count the number of AssessmentSessions
     * const count = await prisma.assessmentSession.count({
     *   where: {
     *     // ... the filter for the AssessmentSessions we want to count
     *   }
     * })
    **/
    count<T extends AssessmentSessionCountArgs>(
      args?: Subset<T, AssessmentSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssessmentSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssessmentSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssessmentSessionAggregateArgs>(args: Subset<T, AssessmentSessionAggregateArgs>): Prisma.PrismaPromise<GetAssessmentSessionAggregateType<T>>

    /**
     * Group by AssessmentSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssessmentSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssessmentSessionGroupByArgs['orderBy'] }
        : { orderBy?: AssessmentSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssessmentSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssessmentSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssessmentSession model
   */
  readonly fields: AssessmentSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssessmentSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssessmentSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    result<T extends AssessmentSession$resultArgs<ExtArgs> = {}>(args?: Subset<T, AssessmentSession$resultArgs<ExtArgs>>): Prisma__AssessmentResultClient<$Result.GetResult<Prisma.$AssessmentResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AssessmentSession model
   */
  interface AssessmentSessionFieldRefs {
    readonly id: FieldRef<"AssessmentSession", 'String'>
    readonly userId: FieldRef<"AssessmentSession", 'String'>
    readonly clerkUserId: FieldRef<"AssessmentSession", 'String'>
    readonly status: FieldRef<"AssessmentSession", 'String'>
    readonly isCurrent: FieldRef<"AssessmentSession", 'Boolean'>
    readonly responses: FieldRef<"AssessmentSession", 'Json'>
    readonly demographics: FieldRef<"AssessmentSession", 'Json'>
    readonly pendingQuestions: FieldRef<"AssessmentSession", 'Json'>
    readonly answerHistory: FieldRef<"AssessmentSession", 'Json'>
    readonly backNavigationCount: FieldRef<"AssessmentSession", 'Int'>
    readonly backNavigationLog: FieldRef<"AssessmentSession", 'Json'>
    readonly metadata: FieldRef<"AssessmentSession", 'Json'>
    readonly createdAt: FieldRef<"AssessmentSession", 'DateTime'>
    readonly updatedAt: FieldRef<"AssessmentSession", 'DateTime'>
    readonly completedAt: FieldRef<"AssessmentSession", 'DateTime'>
    readonly archivedAt: FieldRef<"AssessmentSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssessmentSession findUnique
   */
  export type AssessmentSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentSession
     */
    select?: AssessmentSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentSession
     */
    omit?: AssessmentSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentSessionInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentSession to fetch.
     */
    where: AssessmentSessionWhereUniqueInput
  }

  /**
   * AssessmentSession findUniqueOrThrow
   */
  export type AssessmentSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentSession
     */
    select?: AssessmentSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentSession
     */
    omit?: AssessmentSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentSessionInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentSession to fetch.
     */
    where: AssessmentSessionWhereUniqueInput
  }

  /**
   * AssessmentSession findFirst
   */
  export type AssessmentSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentSession
     */
    select?: AssessmentSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentSession
     */
    omit?: AssessmentSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentSessionInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentSession to fetch.
     */
    where?: AssessmentSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentSessions to fetch.
     */
    orderBy?: AssessmentSessionOrderByWithRelationInput | AssessmentSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentSessions.
     */
    cursor?: AssessmentSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentSessions.
     */
    distinct?: AssessmentSessionScalarFieldEnum | AssessmentSessionScalarFieldEnum[]
  }

  /**
   * AssessmentSession findFirstOrThrow
   */
  export type AssessmentSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentSession
     */
    select?: AssessmentSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentSession
     */
    omit?: AssessmentSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentSessionInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentSession to fetch.
     */
    where?: AssessmentSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentSessions to fetch.
     */
    orderBy?: AssessmentSessionOrderByWithRelationInput | AssessmentSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentSessions.
     */
    cursor?: AssessmentSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentSessions.
     */
    distinct?: AssessmentSessionScalarFieldEnum | AssessmentSessionScalarFieldEnum[]
  }

  /**
   * AssessmentSession findMany
   */
  export type AssessmentSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentSession
     */
    select?: AssessmentSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentSession
     */
    omit?: AssessmentSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentSessionInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentSessions to fetch.
     */
    where?: AssessmentSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentSessions to fetch.
     */
    orderBy?: AssessmentSessionOrderByWithRelationInput | AssessmentSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssessmentSessions.
     */
    cursor?: AssessmentSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentSessions.
     */
    skip?: number
    distinct?: AssessmentSessionScalarFieldEnum | AssessmentSessionScalarFieldEnum[]
  }

  /**
   * AssessmentSession create
   */
  export type AssessmentSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentSession
     */
    select?: AssessmentSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentSession
     */
    omit?: AssessmentSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a AssessmentSession.
     */
    data: XOR<AssessmentSessionCreateInput, AssessmentSessionUncheckedCreateInput>
  }

  /**
   * AssessmentSession createMany
   */
  export type AssessmentSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssessmentSessions.
     */
    data: AssessmentSessionCreateManyInput | AssessmentSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssessmentSession createManyAndReturn
   */
  export type AssessmentSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentSession
     */
    select?: AssessmentSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentSession
     */
    omit?: AssessmentSessionOmit<ExtArgs> | null
    /**
     * The data used to create many AssessmentSessions.
     */
    data: AssessmentSessionCreateManyInput | AssessmentSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssessmentSession update
   */
  export type AssessmentSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentSession
     */
    select?: AssessmentSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentSession
     */
    omit?: AssessmentSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a AssessmentSession.
     */
    data: XOR<AssessmentSessionUpdateInput, AssessmentSessionUncheckedUpdateInput>
    /**
     * Choose, which AssessmentSession to update.
     */
    where: AssessmentSessionWhereUniqueInput
  }

  /**
   * AssessmentSession updateMany
   */
  export type AssessmentSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssessmentSessions.
     */
    data: XOR<AssessmentSessionUpdateManyMutationInput, AssessmentSessionUncheckedUpdateManyInput>
    /**
     * Filter which AssessmentSessions to update
     */
    where?: AssessmentSessionWhereInput
  }

  /**
   * AssessmentSession upsert
   */
  export type AssessmentSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentSession
     */
    select?: AssessmentSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentSession
     */
    omit?: AssessmentSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the AssessmentSession to update in case it exists.
     */
    where: AssessmentSessionWhereUniqueInput
    /**
     * In case the AssessmentSession found by the `where` argument doesn't exist, create a new AssessmentSession with this data.
     */
    create: XOR<AssessmentSessionCreateInput, AssessmentSessionUncheckedCreateInput>
    /**
     * In case the AssessmentSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssessmentSessionUpdateInput, AssessmentSessionUncheckedUpdateInput>
  }

  /**
   * AssessmentSession delete
   */
  export type AssessmentSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentSession
     */
    select?: AssessmentSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentSession
     */
    omit?: AssessmentSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentSessionInclude<ExtArgs> | null
    /**
     * Filter which AssessmentSession to delete.
     */
    where: AssessmentSessionWhereUniqueInput
  }

  /**
   * AssessmentSession deleteMany
   */
  export type AssessmentSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentSessions to delete
     */
    where?: AssessmentSessionWhereInput
  }

  /**
   * AssessmentSession.result
   */
  export type AssessmentSession$resultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentResult
     */
    select?: AssessmentResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentResult
     */
    omit?: AssessmentResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentResultInclude<ExtArgs> | null
    where?: AssessmentResultWhereInput
  }

  /**
   * AssessmentSession without action
   */
  export type AssessmentSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentSession
     */
    select?: AssessmentSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentSession
     */
    omit?: AssessmentSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentSessionInclude<ExtArgs> | null
  }


  /**
   * Model AssessmentResult
   */

  export type AggregateAssessmentResult = {
    _count: AssessmentResultCountAggregateOutputType | null
    _avg: AssessmentResultAvgAggregateOutputType | null
    _sum: AssessmentResultSumAggregateOutputType | null
    _min: AssessmentResultMinAggregateOutputType | null
    _max: AssessmentResultMaxAggregateOutputType | null
  }

  export type AssessmentResultAvgAggregateOutputType = {
    scoreLumen: number | null
    scoreAether: number | null
    scoreOrpheus: number | null
    scoreOrin: number | null
    scoreLyra: number | null
    scoreVara: number | null
    scoreChronos: number | null
    scoreKael: number | null
    consistencyScore: number | null
    attentionScore: number | null
    generationCost: number | null
  }

  export type AssessmentResultSumAggregateOutputType = {
    scoreLumen: number | null
    scoreAether: number | null
    scoreOrpheus: number | null
    scoreOrin: number | null
    scoreLyra: number | null
    scoreVara: number | null
    scoreChronos: number | null
    scoreKael: number | null
    consistencyScore: number | null
    attentionScore: number | null
    generationCost: number | null
  }

  export type AssessmentResultMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    userId: string | null
    clerkUserId: string | null
    isCurrent: boolean | null
    scoreLumen: number | null
    scoreAether: number | null
    scoreOrpheus: number | null
    scoreOrin: number | null
    scoreLyra: number | null
    scoreVara: number | null
    scoreChronos: number | null
    scoreKael: number | null
    archetype: string | null
    profilePattern: string | null
    consistencyScore: number | null
    attentionScore: number | null
    generationCost: number | null
    generationModel: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssessmentResultMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    userId: string | null
    clerkUserId: string | null
    isCurrent: boolean | null
    scoreLumen: number | null
    scoreAether: number | null
    scoreOrpheus: number | null
    scoreOrin: number | null
    scoreLyra: number | null
    scoreVara: number | null
    scoreChronos: number | null
    scoreKael: number | null
    archetype: string | null
    profilePattern: string | null
    consistencyScore: number | null
    attentionScore: number | null
    generationCost: number | null
    generationModel: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssessmentResultCountAggregateOutputType = {
    id: number
    sessionId: number
    userId: number
    clerkUserId: number
    isCurrent: number
    scoreLumen: number
    scoreAether: number
    scoreOrpheus: number
    scoreOrin: number
    scoreLyra: number
    scoreVara: number
    scoreChronos: number
    scoreKael: number
    narrative: number
    archetype: number
    profilePattern: number
    consistencyScore: number
    attentionScore: number
    validationFlags: number
    generationCost: number
    generationModel: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AssessmentResultAvgAggregateInputType = {
    scoreLumen?: true
    scoreAether?: true
    scoreOrpheus?: true
    scoreOrin?: true
    scoreLyra?: true
    scoreVara?: true
    scoreChronos?: true
    scoreKael?: true
    consistencyScore?: true
    attentionScore?: true
    generationCost?: true
  }

  export type AssessmentResultSumAggregateInputType = {
    scoreLumen?: true
    scoreAether?: true
    scoreOrpheus?: true
    scoreOrin?: true
    scoreLyra?: true
    scoreVara?: true
    scoreChronos?: true
    scoreKael?: true
    consistencyScore?: true
    attentionScore?: true
    generationCost?: true
  }

  export type AssessmentResultMinAggregateInputType = {
    id?: true
    sessionId?: true
    userId?: true
    clerkUserId?: true
    isCurrent?: true
    scoreLumen?: true
    scoreAether?: true
    scoreOrpheus?: true
    scoreOrin?: true
    scoreLyra?: true
    scoreVara?: true
    scoreChronos?: true
    scoreKael?: true
    archetype?: true
    profilePattern?: true
    consistencyScore?: true
    attentionScore?: true
    generationCost?: true
    generationModel?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssessmentResultMaxAggregateInputType = {
    id?: true
    sessionId?: true
    userId?: true
    clerkUserId?: true
    isCurrent?: true
    scoreLumen?: true
    scoreAether?: true
    scoreOrpheus?: true
    scoreOrin?: true
    scoreLyra?: true
    scoreVara?: true
    scoreChronos?: true
    scoreKael?: true
    archetype?: true
    profilePattern?: true
    consistencyScore?: true
    attentionScore?: true
    generationCost?: true
    generationModel?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssessmentResultCountAggregateInputType = {
    id?: true
    sessionId?: true
    userId?: true
    clerkUserId?: true
    isCurrent?: true
    scoreLumen?: true
    scoreAether?: true
    scoreOrpheus?: true
    scoreOrin?: true
    scoreLyra?: true
    scoreVara?: true
    scoreChronos?: true
    scoreKael?: true
    narrative?: true
    archetype?: true
    profilePattern?: true
    consistencyScore?: true
    attentionScore?: true
    validationFlags?: true
    generationCost?: true
    generationModel?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AssessmentResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentResult to aggregate.
     */
    where?: AssessmentResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentResults to fetch.
     */
    orderBy?: AssessmentResultOrderByWithRelationInput | AssessmentResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssessmentResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssessmentResults
    **/
    _count?: true | AssessmentResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssessmentResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssessmentResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssessmentResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssessmentResultMaxAggregateInputType
  }

  export type GetAssessmentResultAggregateType<T extends AssessmentResultAggregateArgs> = {
        [P in keyof T & keyof AggregateAssessmentResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssessmentResult[P]>
      : GetScalarType<T[P], AggregateAssessmentResult[P]>
  }




  export type AssessmentResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentResultWhereInput
    orderBy?: AssessmentResultOrderByWithAggregationInput | AssessmentResultOrderByWithAggregationInput[]
    by: AssessmentResultScalarFieldEnum[] | AssessmentResultScalarFieldEnum
    having?: AssessmentResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssessmentResultCountAggregateInputType | true
    _avg?: AssessmentResultAvgAggregateInputType
    _sum?: AssessmentResultSumAggregateInputType
    _min?: AssessmentResultMinAggregateInputType
    _max?: AssessmentResultMaxAggregateInputType
  }

  export type AssessmentResultGroupByOutputType = {
    id: string
    sessionId: string
    userId: string | null
    clerkUserId: string | null
    isCurrent: boolean
    scoreLumen: number
    scoreAether: number
    scoreOrpheus: number
    scoreOrin: number
    scoreLyra: number
    scoreVara: number
    scoreChronos: number
    scoreKael: number
    narrative: JsonValue
    archetype: string | null
    profilePattern: string | null
    consistencyScore: number | null
    attentionScore: number | null
    validationFlags: JsonValue | null
    generationCost: number | null
    generationModel: string | null
    createdAt: Date
    updatedAt: Date
    _count: AssessmentResultCountAggregateOutputType | null
    _avg: AssessmentResultAvgAggregateOutputType | null
    _sum: AssessmentResultSumAggregateOutputType | null
    _min: AssessmentResultMinAggregateOutputType | null
    _max: AssessmentResultMaxAggregateOutputType | null
  }

  type GetAssessmentResultGroupByPayload<T extends AssessmentResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssessmentResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssessmentResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssessmentResultGroupByOutputType[P]>
            : GetScalarType<T[P], AssessmentResultGroupByOutputType[P]>
        }
      >
    >


  export type AssessmentResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    userId?: boolean
    clerkUserId?: boolean
    isCurrent?: boolean
    scoreLumen?: boolean
    scoreAether?: boolean
    scoreOrpheus?: boolean
    scoreOrin?: boolean
    scoreLyra?: boolean
    scoreVara?: boolean
    scoreChronos?: boolean
    scoreKael?: boolean
    narrative?: boolean
    archetype?: boolean
    profilePattern?: boolean
    consistencyScore?: boolean
    attentionScore?: boolean
    validationFlags?: boolean
    generationCost?: boolean
    generationModel?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    session?: boolean | AssessmentSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentResult"]>

  export type AssessmentResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    userId?: boolean
    clerkUserId?: boolean
    isCurrent?: boolean
    scoreLumen?: boolean
    scoreAether?: boolean
    scoreOrpheus?: boolean
    scoreOrin?: boolean
    scoreLyra?: boolean
    scoreVara?: boolean
    scoreChronos?: boolean
    scoreKael?: boolean
    narrative?: boolean
    archetype?: boolean
    profilePattern?: boolean
    consistencyScore?: boolean
    attentionScore?: boolean
    validationFlags?: boolean
    generationCost?: boolean
    generationModel?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    session?: boolean | AssessmentSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentResult"]>


  export type AssessmentResultSelectScalar = {
    id?: boolean
    sessionId?: boolean
    userId?: boolean
    clerkUserId?: boolean
    isCurrent?: boolean
    scoreLumen?: boolean
    scoreAether?: boolean
    scoreOrpheus?: boolean
    scoreOrin?: boolean
    scoreLyra?: boolean
    scoreVara?: boolean
    scoreChronos?: boolean
    scoreKael?: boolean
    narrative?: boolean
    archetype?: boolean
    profilePattern?: boolean
    consistencyScore?: boolean
    attentionScore?: boolean
    validationFlags?: boolean
    generationCost?: boolean
    generationModel?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AssessmentResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "userId" | "clerkUserId" | "isCurrent" | "scoreLumen" | "scoreAether" | "scoreOrpheus" | "scoreOrin" | "scoreLyra" | "scoreVara" | "scoreChronos" | "scoreKael" | "narrative" | "archetype" | "profilePattern" | "consistencyScore" | "attentionScore" | "validationFlags" | "generationCost" | "generationModel" | "createdAt" | "updatedAt", ExtArgs["result"]["assessmentResult"]>
  export type AssessmentResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | AssessmentSessionDefaultArgs<ExtArgs>
  }
  export type AssessmentResultIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | AssessmentSessionDefaultArgs<ExtArgs>
  }

  export type $AssessmentResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssessmentResult"
    objects: {
      session: Prisma.$AssessmentSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      userId: string | null
      clerkUserId: string | null
      isCurrent: boolean
      scoreLumen: number
      scoreAether: number
      scoreOrpheus: number
      scoreOrin: number
      scoreLyra: number
      scoreVara: number
      scoreChronos: number
      scoreKael: number
      narrative: Prisma.JsonValue
      archetype: string | null
      profilePattern: string | null
      consistencyScore: number | null
      attentionScore: number | null
      validationFlags: Prisma.JsonValue | null
      generationCost: number | null
      generationModel: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["assessmentResult"]>
    composites: {}
  }

  type AssessmentResultGetPayload<S extends boolean | null | undefined | AssessmentResultDefaultArgs> = $Result.GetResult<Prisma.$AssessmentResultPayload, S>

  type AssessmentResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssessmentResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssessmentResultCountAggregateInputType | true
    }

  export interface AssessmentResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssessmentResult'], meta: { name: 'AssessmentResult' } }
    /**
     * Find zero or one AssessmentResult that matches the filter.
     * @param {AssessmentResultFindUniqueArgs} args - Arguments to find a AssessmentResult
     * @example
     * // Get one AssessmentResult
     * const assessmentResult = await prisma.assessmentResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssessmentResultFindUniqueArgs>(args: SelectSubset<T, AssessmentResultFindUniqueArgs<ExtArgs>>): Prisma__AssessmentResultClient<$Result.GetResult<Prisma.$AssessmentResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AssessmentResult that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssessmentResultFindUniqueOrThrowArgs} args - Arguments to find a AssessmentResult
     * @example
     * // Get one AssessmentResult
     * const assessmentResult = await prisma.assessmentResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssessmentResultFindUniqueOrThrowArgs>(args: SelectSubset<T, AssessmentResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssessmentResultClient<$Result.GetResult<Prisma.$AssessmentResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentResultFindFirstArgs} args - Arguments to find a AssessmentResult
     * @example
     * // Get one AssessmentResult
     * const assessmentResult = await prisma.assessmentResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssessmentResultFindFirstArgs>(args?: SelectSubset<T, AssessmentResultFindFirstArgs<ExtArgs>>): Prisma__AssessmentResultClient<$Result.GetResult<Prisma.$AssessmentResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentResultFindFirstOrThrowArgs} args - Arguments to find a AssessmentResult
     * @example
     * // Get one AssessmentResult
     * const assessmentResult = await prisma.assessmentResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssessmentResultFindFirstOrThrowArgs>(args?: SelectSubset<T, AssessmentResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssessmentResultClient<$Result.GetResult<Prisma.$AssessmentResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AssessmentResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssessmentResults
     * const assessmentResults = await prisma.assessmentResult.findMany()
     * 
     * // Get first 10 AssessmentResults
     * const assessmentResults = await prisma.assessmentResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assessmentResultWithIdOnly = await prisma.assessmentResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssessmentResultFindManyArgs>(args?: SelectSubset<T, AssessmentResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AssessmentResult.
     * @param {AssessmentResultCreateArgs} args - Arguments to create a AssessmentResult.
     * @example
     * // Create one AssessmentResult
     * const AssessmentResult = await prisma.assessmentResult.create({
     *   data: {
     *     // ... data to create a AssessmentResult
     *   }
     * })
     * 
     */
    create<T extends AssessmentResultCreateArgs>(args: SelectSubset<T, AssessmentResultCreateArgs<ExtArgs>>): Prisma__AssessmentResultClient<$Result.GetResult<Prisma.$AssessmentResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AssessmentResults.
     * @param {AssessmentResultCreateManyArgs} args - Arguments to create many AssessmentResults.
     * @example
     * // Create many AssessmentResults
     * const assessmentResult = await prisma.assessmentResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssessmentResultCreateManyArgs>(args?: SelectSubset<T, AssessmentResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AssessmentResults and returns the data saved in the database.
     * @param {AssessmentResultCreateManyAndReturnArgs} args - Arguments to create many AssessmentResults.
     * @example
     * // Create many AssessmentResults
     * const assessmentResult = await prisma.assessmentResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AssessmentResults and only return the `id`
     * const assessmentResultWithIdOnly = await prisma.assessmentResult.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssessmentResultCreateManyAndReturnArgs>(args?: SelectSubset<T, AssessmentResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AssessmentResult.
     * @param {AssessmentResultDeleteArgs} args - Arguments to delete one AssessmentResult.
     * @example
     * // Delete one AssessmentResult
     * const AssessmentResult = await prisma.assessmentResult.delete({
     *   where: {
     *     // ... filter to delete one AssessmentResult
     *   }
     * })
     * 
     */
    delete<T extends AssessmentResultDeleteArgs>(args: SelectSubset<T, AssessmentResultDeleteArgs<ExtArgs>>): Prisma__AssessmentResultClient<$Result.GetResult<Prisma.$AssessmentResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AssessmentResult.
     * @param {AssessmentResultUpdateArgs} args - Arguments to update one AssessmentResult.
     * @example
     * // Update one AssessmentResult
     * const assessmentResult = await prisma.assessmentResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssessmentResultUpdateArgs>(args: SelectSubset<T, AssessmentResultUpdateArgs<ExtArgs>>): Prisma__AssessmentResultClient<$Result.GetResult<Prisma.$AssessmentResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AssessmentResults.
     * @param {AssessmentResultDeleteManyArgs} args - Arguments to filter AssessmentResults to delete.
     * @example
     * // Delete a few AssessmentResults
     * const { count } = await prisma.assessmentResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssessmentResultDeleteManyArgs>(args?: SelectSubset<T, AssessmentResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssessmentResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssessmentResults
     * const assessmentResult = await prisma.assessmentResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssessmentResultUpdateManyArgs>(args: SelectSubset<T, AssessmentResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AssessmentResult.
     * @param {AssessmentResultUpsertArgs} args - Arguments to update or create a AssessmentResult.
     * @example
     * // Update or create a AssessmentResult
     * const assessmentResult = await prisma.assessmentResult.upsert({
     *   create: {
     *     // ... data to create a AssessmentResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssessmentResult we want to update
     *   }
     * })
     */
    upsert<T extends AssessmentResultUpsertArgs>(args: SelectSubset<T, AssessmentResultUpsertArgs<ExtArgs>>): Prisma__AssessmentResultClient<$Result.GetResult<Prisma.$AssessmentResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AssessmentResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentResultCountArgs} args - Arguments to filter AssessmentResults to count.
     * @example
     * // Count the number of AssessmentResults
     * const count = await prisma.assessmentResult.count({
     *   where: {
     *     // ... the filter for the AssessmentResults we want to count
     *   }
     * })
    **/
    count<T extends AssessmentResultCountArgs>(
      args?: Subset<T, AssessmentResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssessmentResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssessmentResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssessmentResultAggregateArgs>(args: Subset<T, AssessmentResultAggregateArgs>): Prisma.PrismaPromise<GetAssessmentResultAggregateType<T>>

    /**
     * Group by AssessmentResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentResultGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssessmentResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssessmentResultGroupByArgs['orderBy'] }
        : { orderBy?: AssessmentResultGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssessmentResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssessmentResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssessmentResult model
   */
  readonly fields: AssessmentResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssessmentResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssessmentResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends AssessmentSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssessmentSessionDefaultArgs<ExtArgs>>): Prisma__AssessmentSessionClient<$Result.GetResult<Prisma.$AssessmentSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AssessmentResult model
   */
  interface AssessmentResultFieldRefs {
    readonly id: FieldRef<"AssessmentResult", 'String'>
    readonly sessionId: FieldRef<"AssessmentResult", 'String'>
    readonly userId: FieldRef<"AssessmentResult", 'String'>
    readonly clerkUserId: FieldRef<"AssessmentResult", 'String'>
    readonly isCurrent: FieldRef<"AssessmentResult", 'Boolean'>
    readonly scoreLumen: FieldRef<"AssessmentResult", 'Float'>
    readonly scoreAether: FieldRef<"AssessmentResult", 'Float'>
    readonly scoreOrpheus: FieldRef<"AssessmentResult", 'Float'>
    readonly scoreOrin: FieldRef<"AssessmentResult", 'Float'>
    readonly scoreLyra: FieldRef<"AssessmentResult", 'Float'>
    readonly scoreVara: FieldRef<"AssessmentResult", 'Float'>
    readonly scoreChronos: FieldRef<"AssessmentResult", 'Float'>
    readonly scoreKael: FieldRef<"AssessmentResult", 'Float'>
    readonly narrative: FieldRef<"AssessmentResult", 'Json'>
    readonly archetype: FieldRef<"AssessmentResult", 'String'>
    readonly profilePattern: FieldRef<"AssessmentResult", 'String'>
    readonly consistencyScore: FieldRef<"AssessmentResult", 'Float'>
    readonly attentionScore: FieldRef<"AssessmentResult", 'Float'>
    readonly validationFlags: FieldRef<"AssessmentResult", 'Json'>
    readonly generationCost: FieldRef<"AssessmentResult", 'Float'>
    readonly generationModel: FieldRef<"AssessmentResult", 'String'>
    readonly createdAt: FieldRef<"AssessmentResult", 'DateTime'>
    readonly updatedAt: FieldRef<"AssessmentResult", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssessmentResult findUnique
   */
  export type AssessmentResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentResult
     */
    select?: AssessmentResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentResult
     */
    omit?: AssessmentResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentResultInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentResult to fetch.
     */
    where: AssessmentResultWhereUniqueInput
  }

  /**
   * AssessmentResult findUniqueOrThrow
   */
  export type AssessmentResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentResult
     */
    select?: AssessmentResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentResult
     */
    omit?: AssessmentResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentResultInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentResult to fetch.
     */
    where: AssessmentResultWhereUniqueInput
  }

  /**
   * AssessmentResult findFirst
   */
  export type AssessmentResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentResult
     */
    select?: AssessmentResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentResult
     */
    omit?: AssessmentResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentResultInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentResult to fetch.
     */
    where?: AssessmentResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentResults to fetch.
     */
    orderBy?: AssessmentResultOrderByWithRelationInput | AssessmentResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentResults.
     */
    cursor?: AssessmentResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentResults.
     */
    distinct?: AssessmentResultScalarFieldEnum | AssessmentResultScalarFieldEnum[]
  }

  /**
   * AssessmentResult findFirstOrThrow
   */
  export type AssessmentResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentResult
     */
    select?: AssessmentResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentResult
     */
    omit?: AssessmentResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentResultInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentResult to fetch.
     */
    where?: AssessmentResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentResults to fetch.
     */
    orderBy?: AssessmentResultOrderByWithRelationInput | AssessmentResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentResults.
     */
    cursor?: AssessmentResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentResults.
     */
    distinct?: AssessmentResultScalarFieldEnum | AssessmentResultScalarFieldEnum[]
  }

  /**
   * AssessmentResult findMany
   */
  export type AssessmentResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentResult
     */
    select?: AssessmentResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentResult
     */
    omit?: AssessmentResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentResultInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentResults to fetch.
     */
    where?: AssessmentResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentResults to fetch.
     */
    orderBy?: AssessmentResultOrderByWithRelationInput | AssessmentResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssessmentResults.
     */
    cursor?: AssessmentResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentResults.
     */
    skip?: number
    distinct?: AssessmentResultScalarFieldEnum | AssessmentResultScalarFieldEnum[]
  }

  /**
   * AssessmentResult create
   */
  export type AssessmentResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentResult
     */
    select?: AssessmentResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentResult
     */
    omit?: AssessmentResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentResultInclude<ExtArgs> | null
    /**
     * The data needed to create a AssessmentResult.
     */
    data: XOR<AssessmentResultCreateInput, AssessmentResultUncheckedCreateInput>
  }

  /**
   * AssessmentResult createMany
   */
  export type AssessmentResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssessmentResults.
     */
    data: AssessmentResultCreateManyInput | AssessmentResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssessmentResult createManyAndReturn
   */
  export type AssessmentResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentResult
     */
    select?: AssessmentResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentResult
     */
    omit?: AssessmentResultOmit<ExtArgs> | null
    /**
     * The data used to create many AssessmentResults.
     */
    data: AssessmentResultCreateManyInput | AssessmentResultCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentResultIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AssessmentResult update
   */
  export type AssessmentResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentResult
     */
    select?: AssessmentResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentResult
     */
    omit?: AssessmentResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentResultInclude<ExtArgs> | null
    /**
     * The data needed to update a AssessmentResult.
     */
    data: XOR<AssessmentResultUpdateInput, AssessmentResultUncheckedUpdateInput>
    /**
     * Choose, which AssessmentResult to update.
     */
    where: AssessmentResultWhereUniqueInput
  }

  /**
   * AssessmentResult updateMany
   */
  export type AssessmentResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssessmentResults.
     */
    data: XOR<AssessmentResultUpdateManyMutationInput, AssessmentResultUncheckedUpdateManyInput>
    /**
     * Filter which AssessmentResults to update
     */
    where?: AssessmentResultWhereInput
  }

  /**
   * AssessmentResult upsert
   */
  export type AssessmentResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentResult
     */
    select?: AssessmentResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentResult
     */
    omit?: AssessmentResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentResultInclude<ExtArgs> | null
    /**
     * The filter to search for the AssessmentResult to update in case it exists.
     */
    where: AssessmentResultWhereUniqueInput
    /**
     * In case the AssessmentResult found by the `where` argument doesn't exist, create a new AssessmentResult with this data.
     */
    create: XOR<AssessmentResultCreateInput, AssessmentResultUncheckedCreateInput>
    /**
     * In case the AssessmentResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssessmentResultUpdateInput, AssessmentResultUncheckedUpdateInput>
  }

  /**
   * AssessmentResult delete
   */
  export type AssessmentResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentResult
     */
    select?: AssessmentResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentResult
     */
    omit?: AssessmentResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentResultInclude<ExtArgs> | null
    /**
     * Filter which AssessmentResult to delete.
     */
    where: AssessmentResultWhereUniqueInput
  }

  /**
   * AssessmentResult deleteMany
   */
  export type AssessmentResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentResults to delete
     */
    where?: AssessmentResultWhereInput
  }

  /**
   * AssessmentResult without action
   */
  export type AssessmentResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentResult
     */
    select?: AssessmentResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentResult
     */
    omit?: AssessmentResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentResultInclude<ExtArgs> | null
  }


  /**
   * Model AssessmentTemplate
   */

  export type AggregateAssessmentTemplate = {
    _count: AssessmentTemplateCountAggregateOutputType | null
    _avg: AssessmentTemplateAvgAggregateOutputType | null
    _sum: AssessmentTemplateSumAggregateOutputType | null
    _min: AssessmentTemplateMinAggregateOutputType | null
    _max: AssessmentTemplateMaxAggregateOutputType | null
  }

  export type AssessmentTemplateAvgAggregateOutputType = {
    minItemsPerDimension: number | null
    maxTotalItems: number | null
    uncertaintyThreshold: number | null
  }

  export type AssessmentTemplateSumAggregateOutputType = {
    minItemsPerDimension: number | null
    maxTotalItems: number | null
    uncertaintyThreshold: number | null
  }

  export type AssessmentTemplateMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    version: string | null
    minItemsPerDimension: number | null
    maxTotalItems: number | null
    uncertaintyThreshold: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssessmentTemplateMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    version: string | null
    minItemsPerDimension: number | null
    maxTotalItems: number | null
    uncertaintyThreshold: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssessmentTemplateCountAggregateOutputType = {
    id: number
    name: number
    description: number
    version: number
    items: number
    dimensions: number
    minItemsPerDimension: number
    maxTotalItems: number
    uncertaintyThreshold: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AssessmentTemplateAvgAggregateInputType = {
    minItemsPerDimension?: true
    maxTotalItems?: true
    uncertaintyThreshold?: true
  }

  export type AssessmentTemplateSumAggregateInputType = {
    minItemsPerDimension?: true
    maxTotalItems?: true
    uncertaintyThreshold?: true
  }

  export type AssessmentTemplateMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    version?: true
    minItemsPerDimension?: true
    maxTotalItems?: true
    uncertaintyThreshold?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssessmentTemplateMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    version?: true
    minItemsPerDimension?: true
    maxTotalItems?: true
    uncertaintyThreshold?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssessmentTemplateCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    version?: true
    items?: true
    dimensions?: true
    minItemsPerDimension?: true
    maxTotalItems?: true
    uncertaintyThreshold?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AssessmentTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentTemplate to aggregate.
     */
    where?: AssessmentTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentTemplates to fetch.
     */
    orderBy?: AssessmentTemplateOrderByWithRelationInput | AssessmentTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssessmentTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssessmentTemplates
    **/
    _count?: true | AssessmentTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssessmentTemplateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssessmentTemplateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssessmentTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssessmentTemplateMaxAggregateInputType
  }

  export type GetAssessmentTemplateAggregateType<T extends AssessmentTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateAssessmentTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssessmentTemplate[P]>
      : GetScalarType<T[P], AggregateAssessmentTemplate[P]>
  }




  export type AssessmentTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentTemplateWhereInput
    orderBy?: AssessmentTemplateOrderByWithAggregationInput | AssessmentTemplateOrderByWithAggregationInput[]
    by: AssessmentTemplateScalarFieldEnum[] | AssessmentTemplateScalarFieldEnum
    having?: AssessmentTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssessmentTemplateCountAggregateInputType | true
    _avg?: AssessmentTemplateAvgAggregateInputType
    _sum?: AssessmentTemplateSumAggregateInputType
    _min?: AssessmentTemplateMinAggregateInputType
    _max?: AssessmentTemplateMaxAggregateInputType
  }

  export type AssessmentTemplateGroupByOutputType = {
    id: string
    name: string
    description: string | null
    version: string
    items: JsonValue
    dimensions: JsonValue
    minItemsPerDimension: number
    maxTotalItems: number
    uncertaintyThreshold: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: AssessmentTemplateCountAggregateOutputType | null
    _avg: AssessmentTemplateAvgAggregateOutputType | null
    _sum: AssessmentTemplateSumAggregateOutputType | null
    _min: AssessmentTemplateMinAggregateOutputType | null
    _max: AssessmentTemplateMaxAggregateOutputType | null
  }

  type GetAssessmentTemplateGroupByPayload<T extends AssessmentTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssessmentTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssessmentTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssessmentTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], AssessmentTemplateGroupByOutputType[P]>
        }
      >
    >


  export type AssessmentTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    version?: boolean
    items?: boolean
    dimensions?: boolean
    minItemsPerDimension?: boolean
    maxTotalItems?: boolean
    uncertaintyThreshold?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["assessmentTemplate"]>

  export type AssessmentTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    version?: boolean
    items?: boolean
    dimensions?: boolean
    minItemsPerDimension?: boolean
    maxTotalItems?: boolean
    uncertaintyThreshold?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["assessmentTemplate"]>


  export type AssessmentTemplateSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    version?: boolean
    items?: boolean
    dimensions?: boolean
    minItemsPerDimension?: boolean
    maxTotalItems?: boolean
    uncertaintyThreshold?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AssessmentTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "version" | "items" | "dimensions" | "minItemsPerDimension" | "maxTotalItems" | "uncertaintyThreshold" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["assessmentTemplate"]>

  export type $AssessmentTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssessmentTemplate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      version: string
      items: Prisma.JsonValue
      dimensions: Prisma.JsonValue
      minItemsPerDimension: number
      maxTotalItems: number
      uncertaintyThreshold: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["assessmentTemplate"]>
    composites: {}
  }

  type AssessmentTemplateGetPayload<S extends boolean | null | undefined | AssessmentTemplateDefaultArgs> = $Result.GetResult<Prisma.$AssessmentTemplatePayload, S>

  type AssessmentTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssessmentTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssessmentTemplateCountAggregateInputType | true
    }

  export interface AssessmentTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssessmentTemplate'], meta: { name: 'AssessmentTemplate' } }
    /**
     * Find zero or one AssessmentTemplate that matches the filter.
     * @param {AssessmentTemplateFindUniqueArgs} args - Arguments to find a AssessmentTemplate
     * @example
     * // Get one AssessmentTemplate
     * const assessmentTemplate = await prisma.assessmentTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssessmentTemplateFindUniqueArgs>(args: SelectSubset<T, AssessmentTemplateFindUniqueArgs<ExtArgs>>): Prisma__AssessmentTemplateClient<$Result.GetResult<Prisma.$AssessmentTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AssessmentTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssessmentTemplateFindUniqueOrThrowArgs} args - Arguments to find a AssessmentTemplate
     * @example
     * // Get one AssessmentTemplate
     * const assessmentTemplate = await prisma.assessmentTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssessmentTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, AssessmentTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssessmentTemplateClient<$Result.GetResult<Prisma.$AssessmentTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentTemplateFindFirstArgs} args - Arguments to find a AssessmentTemplate
     * @example
     * // Get one AssessmentTemplate
     * const assessmentTemplate = await prisma.assessmentTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssessmentTemplateFindFirstArgs>(args?: SelectSubset<T, AssessmentTemplateFindFirstArgs<ExtArgs>>): Prisma__AssessmentTemplateClient<$Result.GetResult<Prisma.$AssessmentTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentTemplateFindFirstOrThrowArgs} args - Arguments to find a AssessmentTemplate
     * @example
     * // Get one AssessmentTemplate
     * const assessmentTemplate = await prisma.assessmentTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssessmentTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, AssessmentTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssessmentTemplateClient<$Result.GetResult<Prisma.$AssessmentTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AssessmentTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssessmentTemplates
     * const assessmentTemplates = await prisma.assessmentTemplate.findMany()
     * 
     * // Get first 10 AssessmentTemplates
     * const assessmentTemplates = await prisma.assessmentTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assessmentTemplateWithIdOnly = await prisma.assessmentTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssessmentTemplateFindManyArgs>(args?: SelectSubset<T, AssessmentTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AssessmentTemplate.
     * @param {AssessmentTemplateCreateArgs} args - Arguments to create a AssessmentTemplate.
     * @example
     * // Create one AssessmentTemplate
     * const AssessmentTemplate = await prisma.assessmentTemplate.create({
     *   data: {
     *     // ... data to create a AssessmentTemplate
     *   }
     * })
     * 
     */
    create<T extends AssessmentTemplateCreateArgs>(args: SelectSubset<T, AssessmentTemplateCreateArgs<ExtArgs>>): Prisma__AssessmentTemplateClient<$Result.GetResult<Prisma.$AssessmentTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AssessmentTemplates.
     * @param {AssessmentTemplateCreateManyArgs} args - Arguments to create many AssessmentTemplates.
     * @example
     * // Create many AssessmentTemplates
     * const assessmentTemplate = await prisma.assessmentTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssessmentTemplateCreateManyArgs>(args?: SelectSubset<T, AssessmentTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AssessmentTemplates and returns the data saved in the database.
     * @param {AssessmentTemplateCreateManyAndReturnArgs} args - Arguments to create many AssessmentTemplates.
     * @example
     * // Create many AssessmentTemplates
     * const assessmentTemplate = await prisma.assessmentTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AssessmentTemplates and only return the `id`
     * const assessmentTemplateWithIdOnly = await prisma.assessmentTemplate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssessmentTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, AssessmentTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AssessmentTemplate.
     * @param {AssessmentTemplateDeleteArgs} args - Arguments to delete one AssessmentTemplate.
     * @example
     * // Delete one AssessmentTemplate
     * const AssessmentTemplate = await prisma.assessmentTemplate.delete({
     *   where: {
     *     // ... filter to delete one AssessmentTemplate
     *   }
     * })
     * 
     */
    delete<T extends AssessmentTemplateDeleteArgs>(args: SelectSubset<T, AssessmentTemplateDeleteArgs<ExtArgs>>): Prisma__AssessmentTemplateClient<$Result.GetResult<Prisma.$AssessmentTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AssessmentTemplate.
     * @param {AssessmentTemplateUpdateArgs} args - Arguments to update one AssessmentTemplate.
     * @example
     * // Update one AssessmentTemplate
     * const assessmentTemplate = await prisma.assessmentTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssessmentTemplateUpdateArgs>(args: SelectSubset<T, AssessmentTemplateUpdateArgs<ExtArgs>>): Prisma__AssessmentTemplateClient<$Result.GetResult<Prisma.$AssessmentTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AssessmentTemplates.
     * @param {AssessmentTemplateDeleteManyArgs} args - Arguments to filter AssessmentTemplates to delete.
     * @example
     * // Delete a few AssessmentTemplates
     * const { count } = await prisma.assessmentTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssessmentTemplateDeleteManyArgs>(args?: SelectSubset<T, AssessmentTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssessmentTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssessmentTemplates
     * const assessmentTemplate = await prisma.assessmentTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssessmentTemplateUpdateManyArgs>(args: SelectSubset<T, AssessmentTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AssessmentTemplate.
     * @param {AssessmentTemplateUpsertArgs} args - Arguments to update or create a AssessmentTemplate.
     * @example
     * // Update or create a AssessmentTemplate
     * const assessmentTemplate = await prisma.assessmentTemplate.upsert({
     *   create: {
     *     // ... data to create a AssessmentTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssessmentTemplate we want to update
     *   }
     * })
     */
    upsert<T extends AssessmentTemplateUpsertArgs>(args: SelectSubset<T, AssessmentTemplateUpsertArgs<ExtArgs>>): Prisma__AssessmentTemplateClient<$Result.GetResult<Prisma.$AssessmentTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AssessmentTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentTemplateCountArgs} args - Arguments to filter AssessmentTemplates to count.
     * @example
     * // Count the number of AssessmentTemplates
     * const count = await prisma.assessmentTemplate.count({
     *   where: {
     *     // ... the filter for the AssessmentTemplates we want to count
     *   }
     * })
    **/
    count<T extends AssessmentTemplateCountArgs>(
      args?: Subset<T, AssessmentTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssessmentTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssessmentTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssessmentTemplateAggregateArgs>(args: Subset<T, AssessmentTemplateAggregateArgs>): Prisma.PrismaPromise<GetAssessmentTemplateAggregateType<T>>

    /**
     * Group by AssessmentTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssessmentTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssessmentTemplateGroupByArgs['orderBy'] }
        : { orderBy?: AssessmentTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssessmentTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssessmentTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssessmentTemplate model
   */
  readonly fields: AssessmentTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssessmentTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssessmentTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AssessmentTemplate model
   */
  interface AssessmentTemplateFieldRefs {
    readonly id: FieldRef<"AssessmentTemplate", 'String'>
    readonly name: FieldRef<"AssessmentTemplate", 'String'>
    readonly description: FieldRef<"AssessmentTemplate", 'String'>
    readonly version: FieldRef<"AssessmentTemplate", 'String'>
    readonly items: FieldRef<"AssessmentTemplate", 'Json'>
    readonly dimensions: FieldRef<"AssessmentTemplate", 'Json'>
    readonly minItemsPerDimension: FieldRef<"AssessmentTemplate", 'Int'>
    readonly maxTotalItems: FieldRef<"AssessmentTemplate", 'Int'>
    readonly uncertaintyThreshold: FieldRef<"AssessmentTemplate", 'Float'>
    readonly isActive: FieldRef<"AssessmentTemplate", 'Boolean'>
    readonly createdAt: FieldRef<"AssessmentTemplate", 'DateTime'>
    readonly updatedAt: FieldRef<"AssessmentTemplate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssessmentTemplate findUnique
   */
  export type AssessmentTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentTemplate
     */
    select?: AssessmentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentTemplate
     */
    omit?: AssessmentTemplateOmit<ExtArgs> | null
    /**
     * Filter, which AssessmentTemplate to fetch.
     */
    where: AssessmentTemplateWhereUniqueInput
  }

  /**
   * AssessmentTemplate findUniqueOrThrow
   */
  export type AssessmentTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentTemplate
     */
    select?: AssessmentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentTemplate
     */
    omit?: AssessmentTemplateOmit<ExtArgs> | null
    /**
     * Filter, which AssessmentTemplate to fetch.
     */
    where: AssessmentTemplateWhereUniqueInput
  }

  /**
   * AssessmentTemplate findFirst
   */
  export type AssessmentTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentTemplate
     */
    select?: AssessmentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentTemplate
     */
    omit?: AssessmentTemplateOmit<ExtArgs> | null
    /**
     * Filter, which AssessmentTemplate to fetch.
     */
    where?: AssessmentTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentTemplates to fetch.
     */
    orderBy?: AssessmentTemplateOrderByWithRelationInput | AssessmentTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentTemplates.
     */
    cursor?: AssessmentTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentTemplates.
     */
    distinct?: AssessmentTemplateScalarFieldEnum | AssessmentTemplateScalarFieldEnum[]
  }

  /**
   * AssessmentTemplate findFirstOrThrow
   */
  export type AssessmentTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentTemplate
     */
    select?: AssessmentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentTemplate
     */
    omit?: AssessmentTemplateOmit<ExtArgs> | null
    /**
     * Filter, which AssessmentTemplate to fetch.
     */
    where?: AssessmentTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentTemplates to fetch.
     */
    orderBy?: AssessmentTemplateOrderByWithRelationInput | AssessmentTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentTemplates.
     */
    cursor?: AssessmentTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentTemplates.
     */
    distinct?: AssessmentTemplateScalarFieldEnum | AssessmentTemplateScalarFieldEnum[]
  }

  /**
   * AssessmentTemplate findMany
   */
  export type AssessmentTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentTemplate
     */
    select?: AssessmentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentTemplate
     */
    omit?: AssessmentTemplateOmit<ExtArgs> | null
    /**
     * Filter, which AssessmentTemplates to fetch.
     */
    where?: AssessmentTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentTemplates to fetch.
     */
    orderBy?: AssessmentTemplateOrderByWithRelationInput | AssessmentTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssessmentTemplates.
     */
    cursor?: AssessmentTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentTemplates.
     */
    skip?: number
    distinct?: AssessmentTemplateScalarFieldEnum | AssessmentTemplateScalarFieldEnum[]
  }

  /**
   * AssessmentTemplate create
   */
  export type AssessmentTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentTemplate
     */
    select?: AssessmentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentTemplate
     */
    omit?: AssessmentTemplateOmit<ExtArgs> | null
    /**
     * The data needed to create a AssessmentTemplate.
     */
    data: XOR<AssessmentTemplateCreateInput, AssessmentTemplateUncheckedCreateInput>
  }

  /**
   * AssessmentTemplate createMany
   */
  export type AssessmentTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssessmentTemplates.
     */
    data: AssessmentTemplateCreateManyInput | AssessmentTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssessmentTemplate createManyAndReturn
   */
  export type AssessmentTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentTemplate
     */
    select?: AssessmentTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentTemplate
     */
    omit?: AssessmentTemplateOmit<ExtArgs> | null
    /**
     * The data used to create many AssessmentTemplates.
     */
    data: AssessmentTemplateCreateManyInput | AssessmentTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssessmentTemplate update
   */
  export type AssessmentTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentTemplate
     */
    select?: AssessmentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentTemplate
     */
    omit?: AssessmentTemplateOmit<ExtArgs> | null
    /**
     * The data needed to update a AssessmentTemplate.
     */
    data: XOR<AssessmentTemplateUpdateInput, AssessmentTemplateUncheckedUpdateInput>
    /**
     * Choose, which AssessmentTemplate to update.
     */
    where: AssessmentTemplateWhereUniqueInput
  }

  /**
   * AssessmentTemplate updateMany
   */
  export type AssessmentTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssessmentTemplates.
     */
    data: XOR<AssessmentTemplateUpdateManyMutationInput, AssessmentTemplateUncheckedUpdateManyInput>
    /**
     * Filter which AssessmentTemplates to update
     */
    where?: AssessmentTemplateWhereInput
  }

  /**
   * AssessmentTemplate upsert
   */
  export type AssessmentTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentTemplate
     */
    select?: AssessmentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentTemplate
     */
    omit?: AssessmentTemplateOmit<ExtArgs> | null
    /**
     * The filter to search for the AssessmentTemplate to update in case it exists.
     */
    where: AssessmentTemplateWhereUniqueInput
    /**
     * In case the AssessmentTemplate found by the `where` argument doesn't exist, create a new AssessmentTemplate with this data.
     */
    create: XOR<AssessmentTemplateCreateInput, AssessmentTemplateUncheckedCreateInput>
    /**
     * In case the AssessmentTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssessmentTemplateUpdateInput, AssessmentTemplateUncheckedUpdateInput>
  }

  /**
   * AssessmentTemplate delete
   */
  export type AssessmentTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentTemplate
     */
    select?: AssessmentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentTemplate
     */
    omit?: AssessmentTemplateOmit<ExtArgs> | null
    /**
     * Filter which AssessmentTemplate to delete.
     */
    where: AssessmentTemplateWhereUniqueInput
  }

  /**
   * AssessmentTemplate deleteMany
   */
  export type AssessmentTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentTemplates to delete
     */
    where?: AssessmentTemplateWhereInput
  }

  /**
   * AssessmentTemplate without action
   */
  export type AssessmentTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentTemplate
     */
    select?: AssessmentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentTemplate
     */
    omit?: AssessmentTemplateOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    clerkId: 'clerkId'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    bio: 'bio',
    avatarUrl: 'avatarUrl',
    personality: 'personality',
    createdAt: 'createdAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const QuestionScalarFieldEnum: {
    id: 'id',
    text: 'text',
    category: 'category',
    isThirdParty: 'isThirdParty',
    createdAt: 'createdAt'
  };

  export type QuestionScalarFieldEnum = (typeof QuestionScalarFieldEnum)[keyof typeof QuestionScalarFieldEnum]


  export const ResponseScalarFieldEnum: {
    id: 'id',
    questionId: 'questionId',
    answeredById: 'answeredById',
    aboutUserId: 'aboutUserId',
    answer: 'answer',
    notSure: 'notSure',
    responseTime: 'responseTime',
    qualityScore: 'qualityScore',
    flaggedMalicious: 'flaggedMalicious',
    createdAt: 'createdAt'
  };

  export type ResponseScalarFieldEnum = (typeof ResponseScalarFieldEnum)[keyof typeof ResponseScalarFieldEnum]


  export const InviteLinkScalarFieldEnum: {
    id: 'id',
    inviteCode: 'inviteCode',
    inviterId: 'inviterId',
    targetId: 'targetId',
    status: 'status',
    expiresAt: 'expiresAt',
    completedAt: 'completedAt',
    friendEmail: 'friendEmail',
    friendNickname: 'friendNickname',
    relationshipType: 'relationshipType',
    openedAt: 'openedAt',
    startedAt: 'startedAt',
    abandonedAt: 'abandonedAt',
    deviceType: 'deviceType',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InviteLinkScalarFieldEnum = (typeof InviteLinkScalarFieldEnum)[keyof typeof InviteLinkScalarFieldEnum]


  export const RateLimitScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    invitesSent: 'invitesSent',
    windowStart: 'windowStart',
    windowEnd: 'windowEnd',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RateLimitScalarFieldEnum = (typeof RateLimitScalarFieldEnum)[keyof typeof RateLimitScalarFieldEnum]


  export const AssessmentSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    clerkUserId: 'clerkUserId',
    status: 'status',
    isCurrent: 'isCurrent',
    responses: 'responses',
    demographics: 'demographics',
    pendingQuestions: 'pendingQuestions',
    answerHistory: 'answerHistory',
    backNavigationCount: 'backNavigationCount',
    backNavigationLog: 'backNavigationLog',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    completedAt: 'completedAt',
    archivedAt: 'archivedAt'
  };

  export type AssessmentSessionScalarFieldEnum = (typeof AssessmentSessionScalarFieldEnum)[keyof typeof AssessmentSessionScalarFieldEnum]


  export const AssessmentResultScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    userId: 'userId',
    clerkUserId: 'clerkUserId',
    isCurrent: 'isCurrent',
    scoreLumen: 'scoreLumen',
    scoreAether: 'scoreAether',
    scoreOrpheus: 'scoreOrpheus',
    scoreOrin: 'scoreOrin',
    scoreLyra: 'scoreLyra',
    scoreVara: 'scoreVara',
    scoreChronos: 'scoreChronos',
    scoreKael: 'scoreKael',
    narrative: 'narrative',
    archetype: 'archetype',
    profilePattern: 'profilePattern',
    consistencyScore: 'consistencyScore',
    attentionScore: 'attentionScore',
    validationFlags: 'validationFlags',
    generationCost: 'generationCost',
    generationModel: 'generationModel',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AssessmentResultScalarFieldEnum = (typeof AssessmentResultScalarFieldEnum)[keyof typeof AssessmentResultScalarFieldEnum]


  export const AssessmentTemplateScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    version: 'version',
    items: 'items',
    dimensions: 'dimensions',
    minItemsPerDimension: 'minItemsPerDimension',
    maxTotalItems: 'maxTotalItems',
    uncertaintyThreshold: 'uncertaintyThreshold',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AssessmentTemplateScalarFieldEnum = (typeof AssessmentTemplateScalarFieldEnum)[keyof typeof AssessmentTemplateScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    clerkId?: StringFilter<"User"> | string
    inviteLinksSent?: InviteLinkListRelationFilter
    inviteLinksReceived?: InviteLinkListRelationFilter
    profile?: XOR<ProfileNullableRelationFilter, ProfileWhereInput> | null
    responsesAbout?: ResponseListRelationFilter
    responsesGiven?: ResponseListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clerkId?: SortOrder
    inviteLinksSent?: InviteLinkOrderByRelationAggregateInput
    inviteLinksReceived?: InviteLinkOrderByRelationAggregateInput
    profile?: ProfileOrderByWithRelationInput
    responsesAbout?: ResponseOrderByRelationAggregateInput
    responsesGiven?: ResponseOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    clerkId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    inviteLinksSent?: InviteLinkListRelationFilter
    inviteLinksReceived?: InviteLinkListRelationFilter
    profile?: XOR<ProfileNullableRelationFilter, ProfileWhereInput> | null
    responsesAbout?: ResponseListRelationFilter
    responsesGiven?: ResponseListRelationFilter
  }, "id" | "email" | "clerkId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clerkId?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    clerkId?: StringWithAggregatesFilter<"User"> | string
  }

  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    userId?: StringFilter<"Profile"> | string
    bio?: StringNullableFilter<"Profile"> | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    personality?: JsonNullableFilter<"Profile">
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    personality?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    bio?: StringNullableFilter<"Profile"> | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    personality?: JsonNullableFilter<"Profile">
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    personality?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    userId?: StringWithAggregatesFilter<"Profile"> | string
    bio?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    personality?: JsonNullableWithAggregatesFilter<"Profile">
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type QuestionWhereInput = {
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    id?: StringFilter<"Question"> | string
    text?: StringFilter<"Question"> | string
    category?: StringNullableFilter<"Question"> | string | null
    isThirdParty?: BoolFilter<"Question"> | boolean
    createdAt?: DateTimeFilter<"Question"> | Date | string
    responses?: ResponseListRelationFilter
  }

  export type QuestionOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    category?: SortOrderInput | SortOrder
    isThirdParty?: SortOrder
    createdAt?: SortOrder
    responses?: ResponseOrderByRelationAggregateInput
  }

  export type QuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    text?: StringFilter<"Question"> | string
    category?: StringNullableFilter<"Question"> | string | null
    isThirdParty?: BoolFilter<"Question"> | boolean
    createdAt?: DateTimeFilter<"Question"> | Date | string
    responses?: ResponseListRelationFilter
  }, "id">

  export type QuestionOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    category?: SortOrderInput | SortOrder
    isThirdParty?: SortOrder
    createdAt?: SortOrder
    _count?: QuestionCountOrderByAggregateInput
    _max?: QuestionMaxOrderByAggregateInput
    _min?: QuestionMinOrderByAggregateInput
  }

  export type QuestionScalarWhereWithAggregatesInput = {
    AND?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    OR?: QuestionScalarWhereWithAggregatesInput[]
    NOT?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Question"> | string
    text?: StringWithAggregatesFilter<"Question"> | string
    category?: StringNullableWithAggregatesFilter<"Question"> | string | null
    isThirdParty?: BoolWithAggregatesFilter<"Question"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Question"> | Date | string
  }

  export type ResponseWhereInput = {
    AND?: ResponseWhereInput | ResponseWhereInput[]
    OR?: ResponseWhereInput[]
    NOT?: ResponseWhereInput | ResponseWhereInput[]
    id?: StringFilter<"Response"> | string
    questionId?: StringFilter<"Response"> | string
    answeredById?: StringFilter<"Response"> | string
    aboutUserId?: StringFilter<"Response"> | string
    answer?: StringFilter<"Response"> | string
    notSure?: BoolFilter<"Response"> | boolean
    responseTime?: IntNullableFilter<"Response"> | number | null
    qualityScore?: FloatNullableFilter<"Response"> | number | null
    flaggedMalicious?: BoolFilter<"Response"> | boolean
    createdAt?: DateTimeFilter<"Response"> | Date | string
    aboutUser?: XOR<UserRelationFilter, UserWhereInput>
    answeredByUser?: XOR<UserRelationFilter, UserWhereInput>
    question?: XOR<QuestionRelationFilter, QuestionWhereInput>
  }

  export type ResponseOrderByWithRelationInput = {
    id?: SortOrder
    questionId?: SortOrder
    answeredById?: SortOrder
    aboutUserId?: SortOrder
    answer?: SortOrder
    notSure?: SortOrder
    responseTime?: SortOrderInput | SortOrder
    qualityScore?: SortOrderInput | SortOrder
    flaggedMalicious?: SortOrder
    createdAt?: SortOrder
    aboutUser?: UserOrderByWithRelationInput
    answeredByUser?: UserOrderByWithRelationInput
    question?: QuestionOrderByWithRelationInput
  }

  export type ResponseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResponseWhereInput | ResponseWhereInput[]
    OR?: ResponseWhereInput[]
    NOT?: ResponseWhereInput | ResponseWhereInput[]
    questionId?: StringFilter<"Response"> | string
    answeredById?: StringFilter<"Response"> | string
    aboutUserId?: StringFilter<"Response"> | string
    answer?: StringFilter<"Response"> | string
    notSure?: BoolFilter<"Response"> | boolean
    responseTime?: IntNullableFilter<"Response"> | number | null
    qualityScore?: FloatNullableFilter<"Response"> | number | null
    flaggedMalicious?: BoolFilter<"Response"> | boolean
    createdAt?: DateTimeFilter<"Response"> | Date | string
    aboutUser?: XOR<UserRelationFilter, UserWhereInput>
    answeredByUser?: XOR<UserRelationFilter, UserWhereInput>
    question?: XOR<QuestionRelationFilter, QuestionWhereInput>
  }, "id">

  export type ResponseOrderByWithAggregationInput = {
    id?: SortOrder
    questionId?: SortOrder
    answeredById?: SortOrder
    aboutUserId?: SortOrder
    answer?: SortOrder
    notSure?: SortOrder
    responseTime?: SortOrderInput | SortOrder
    qualityScore?: SortOrderInput | SortOrder
    flaggedMalicious?: SortOrder
    createdAt?: SortOrder
    _count?: ResponseCountOrderByAggregateInput
    _avg?: ResponseAvgOrderByAggregateInput
    _max?: ResponseMaxOrderByAggregateInput
    _min?: ResponseMinOrderByAggregateInput
    _sum?: ResponseSumOrderByAggregateInput
  }

  export type ResponseScalarWhereWithAggregatesInput = {
    AND?: ResponseScalarWhereWithAggregatesInput | ResponseScalarWhereWithAggregatesInput[]
    OR?: ResponseScalarWhereWithAggregatesInput[]
    NOT?: ResponseScalarWhereWithAggregatesInput | ResponseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Response"> | string
    questionId?: StringWithAggregatesFilter<"Response"> | string
    answeredById?: StringWithAggregatesFilter<"Response"> | string
    aboutUserId?: StringWithAggregatesFilter<"Response"> | string
    answer?: StringWithAggregatesFilter<"Response"> | string
    notSure?: BoolWithAggregatesFilter<"Response"> | boolean
    responseTime?: IntNullableWithAggregatesFilter<"Response"> | number | null
    qualityScore?: FloatNullableWithAggregatesFilter<"Response"> | number | null
    flaggedMalicious?: BoolWithAggregatesFilter<"Response"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Response"> | Date | string
  }

  export type InviteLinkWhereInput = {
    AND?: InviteLinkWhereInput | InviteLinkWhereInput[]
    OR?: InviteLinkWhereInput[]
    NOT?: InviteLinkWhereInput | InviteLinkWhereInput[]
    id?: StringFilter<"InviteLink"> | string
    inviteCode?: StringFilter<"InviteLink"> | string
    inviterId?: StringFilter<"InviteLink"> | string
    targetId?: StringNullableFilter<"InviteLink"> | string | null
    status?: StringFilter<"InviteLink"> | string
    expiresAt?: DateTimeFilter<"InviteLink"> | Date | string
    completedAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    friendEmail?: StringNullableFilter<"InviteLink"> | string | null
    friendNickname?: StringNullableFilter<"InviteLink"> | string | null
    relationshipType?: StringNullableFilter<"InviteLink"> | string | null
    openedAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    startedAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    abandonedAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    deviceType?: StringNullableFilter<"InviteLink"> | string | null
    ipAddress?: StringNullableFilter<"InviteLink"> | string | null
    userAgent?: StringNullableFilter<"InviteLink"> | string | null
    createdAt?: DateTimeFilter<"InviteLink"> | Date | string
    updatedAt?: DateTimeFilter<"InviteLink"> | Date | string
    inviter?: XOR<UserRelationFilter, UserWhereInput>
    target?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type InviteLinkOrderByWithRelationInput = {
    id?: SortOrder
    inviteCode?: SortOrder
    inviterId?: SortOrder
    targetId?: SortOrderInput | SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    friendEmail?: SortOrderInput | SortOrder
    friendNickname?: SortOrderInput | SortOrder
    relationshipType?: SortOrderInput | SortOrder
    openedAt?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    abandonedAt?: SortOrderInput | SortOrder
    deviceType?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inviter?: UserOrderByWithRelationInput
    target?: UserOrderByWithRelationInput
  }

  export type InviteLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    inviteCode?: string
    AND?: InviteLinkWhereInput | InviteLinkWhereInput[]
    OR?: InviteLinkWhereInput[]
    NOT?: InviteLinkWhereInput | InviteLinkWhereInput[]
    inviterId?: StringFilter<"InviteLink"> | string
    targetId?: StringNullableFilter<"InviteLink"> | string | null
    status?: StringFilter<"InviteLink"> | string
    expiresAt?: DateTimeFilter<"InviteLink"> | Date | string
    completedAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    friendEmail?: StringNullableFilter<"InviteLink"> | string | null
    friendNickname?: StringNullableFilter<"InviteLink"> | string | null
    relationshipType?: StringNullableFilter<"InviteLink"> | string | null
    openedAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    startedAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    abandonedAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    deviceType?: StringNullableFilter<"InviteLink"> | string | null
    ipAddress?: StringNullableFilter<"InviteLink"> | string | null
    userAgent?: StringNullableFilter<"InviteLink"> | string | null
    createdAt?: DateTimeFilter<"InviteLink"> | Date | string
    updatedAt?: DateTimeFilter<"InviteLink"> | Date | string
    inviter?: XOR<UserRelationFilter, UserWhereInput>
    target?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id" | "inviteCode">

  export type InviteLinkOrderByWithAggregationInput = {
    id?: SortOrder
    inviteCode?: SortOrder
    inviterId?: SortOrder
    targetId?: SortOrderInput | SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    friendEmail?: SortOrderInput | SortOrder
    friendNickname?: SortOrderInput | SortOrder
    relationshipType?: SortOrderInput | SortOrder
    openedAt?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    abandonedAt?: SortOrderInput | SortOrder
    deviceType?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InviteLinkCountOrderByAggregateInput
    _max?: InviteLinkMaxOrderByAggregateInput
    _min?: InviteLinkMinOrderByAggregateInput
  }

  export type InviteLinkScalarWhereWithAggregatesInput = {
    AND?: InviteLinkScalarWhereWithAggregatesInput | InviteLinkScalarWhereWithAggregatesInput[]
    OR?: InviteLinkScalarWhereWithAggregatesInput[]
    NOT?: InviteLinkScalarWhereWithAggregatesInput | InviteLinkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InviteLink"> | string
    inviteCode?: StringWithAggregatesFilter<"InviteLink"> | string
    inviterId?: StringWithAggregatesFilter<"InviteLink"> | string
    targetId?: StringNullableWithAggregatesFilter<"InviteLink"> | string | null
    status?: StringWithAggregatesFilter<"InviteLink"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"InviteLink"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"InviteLink"> | Date | string | null
    friendEmail?: StringNullableWithAggregatesFilter<"InviteLink"> | string | null
    friendNickname?: StringNullableWithAggregatesFilter<"InviteLink"> | string | null
    relationshipType?: StringNullableWithAggregatesFilter<"InviteLink"> | string | null
    openedAt?: DateTimeNullableWithAggregatesFilter<"InviteLink"> | Date | string | null
    startedAt?: DateTimeNullableWithAggregatesFilter<"InviteLink"> | Date | string | null
    abandonedAt?: DateTimeNullableWithAggregatesFilter<"InviteLink"> | Date | string | null
    deviceType?: StringNullableWithAggregatesFilter<"InviteLink"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"InviteLink"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"InviteLink"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"InviteLink"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"InviteLink"> | Date | string
  }

  export type RateLimitWhereInput = {
    AND?: RateLimitWhereInput | RateLimitWhereInput[]
    OR?: RateLimitWhereInput[]
    NOT?: RateLimitWhereInput | RateLimitWhereInput[]
    id?: StringFilter<"RateLimit"> | string
    userId?: StringFilter<"RateLimit"> | string
    invitesSent?: IntFilter<"RateLimit"> | number
    windowStart?: DateTimeFilter<"RateLimit"> | Date | string
    windowEnd?: DateTimeFilter<"RateLimit"> | Date | string
    createdAt?: DateTimeFilter<"RateLimit"> | Date | string
    updatedAt?: DateTimeFilter<"RateLimit"> | Date | string
  }

  export type RateLimitOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    invitesSent?: SortOrder
    windowStart?: SortOrder
    windowEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RateLimitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_windowStart?: RateLimitUserIdWindowStartCompoundUniqueInput
    AND?: RateLimitWhereInput | RateLimitWhereInput[]
    OR?: RateLimitWhereInput[]
    NOT?: RateLimitWhereInput | RateLimitWhereInput[]
    userId?: StringFilter<"RateLimit"> | string
    invitesSent?: IntFilter<"RateLimit"> | number
    windowStart?: DateTimeFilter<"RateLimit"> | Date | string
    windowEnd?: DateTimeFilter<"RateLimit"> | Date | string
    createdAt?: DateTimeFilter<"RateLimit"> | Date | string
    updatedAt?: DateTimeFilter<"RateLimit"> | Date | string
  }, "id" | "userId_windowStart">

  export type RateLimitOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    invitesSent?: SortOrder
    windowStart?: SortOrder
    windowEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RateLimitCountOrderByAggregateInput
    _avg?: RateLimitAvgOrderByAggregateInput
    _max?: RateLimitMaxOrderByAggregateInput
    _min?: RateLimitMinOrderByAggregateInput
    _sum?: RateLimitSumOrderByAggregateInput
  }

  export type RateLimitScalarWhereWithAggregatesInput = {
    AND?: RateLimitScalarWhereWithAggregatesInput | RateLimitScalarWhereWithAggregatesInput[]
    OR?: RateLimitScalarWhereWithAggregatesInput[]
    NOT?: RateLimitScalarWhereWithAggregatesInput | RateLimitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RateLimit"> | string
    userId?: StringWithAggregatesFilter<"RateLimit"> | string
    invitesSent?: IntWithAggregatesFilter<"RateLimit"> | number
    windowStart?: DateTimeWithAggregatesFilter<"RateLimit"> | Date | string
    windowEnd?: DateTimeWithAggregatesFilter<"RateLimit"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"RateLimit"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RateLimit"> | Date | string
  }

  export type AssessmentSessionWhereInput = {
    AND?: AssessmentSessionWhereInput | AssessmentSessionWhereInput[]
    OR?: AssessmentSessionWhereInput[]
    NOT?: AssessmentSessionWhereInput | AssessmentSessionWhereInput[]
    id?: StringFilter<"AssessmentSession"> | string
    userId?: StringNullableFilter<"AssessmentSession"> | string | null
    clerkUserId?: StringNullableFilter<"AssessmentSession"> | string | null
    status?: StringFilter<"AssessmentSession"> | string
    isCurrent?: BoolFilter<"AssessmentSession"> | boolean
    responses?: JsonFilter<"AssessmentSession">
    demographics?: JsonNullableFilter<"AssessmentSession">
    pendingQuestions?: JsonNullableFilter<"AssessmentSession">
    answerHistory?: JsonNullableFilter<"AssessmentSession">
    backNavigationCount?: IntFilter<"AssessmentSession"> | number
    backNavigationLog?: JsonNullableFilter<"AssessmentSession">
    metadata?: JsonNullableFilter<"AssessmentSession">
    createdAt?: DateTimeFilter<"AssessmentSession"> | Date | string
    updatedAt?: DateTimeFilter<"AssessmentSession"> | Date | string
    completedAt?: DateTimeNullableFilter<"AssessmentSession"> | Date | string | null
    archivedAt?: DateTimeNullableFilter<"AssessmentSession"> | Date | string | null
    result?: XOR<AssessmentResultNullableRelationFilter, AssessmentResultWhereInput> | null
  }

  export type AssessmentSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    clerkUserId?: SortOrderInput | SortOrder
    status?: SortOrder
    isCurrent?: SortOrder
    responses?: SortOrder
    demographics?: SortOrderInput | SortOrder
    pendingQuestions?: SortOrderInput | SortOrder
    answerHistory?: SortOrderInput | SortOrder
    backNavigationCount?: SortOrder
    backNavigationLog?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    archivedAt?: SortOrderInput | SortOrder
    result?: AssessmentResultOrderByWithRelationInput
  }

  export type AssessmentSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AssessmentSessionWhereInput | AssessmentSessionWhereInput[]
    OR?: AssessmentSessionWhereInput[]
    NOT?: AssessmentSessionWhereInput | AssessmentSessionWhereInput[]
    userId?: StringNullableFilter<"AssessmentSession"> | string | null
    clerkUserId?: StringNullableFilter<"AssessmentSession"> | string | null
    status?: StringFilter<"AssessmentSession"> | string
    isCurrent?: BoolFilter<"AssessmentSession"> | boolean
    responses?: JsonFilter<"AssessmentSession">
    demographics?: JsonNullableFilter<"AssessmentSession">
    pendingQuestions?: JsonNullableFilter<"AssessmentSession">
    answerHistory?: JsonNullableFilter<"AssessmentSession">
    backNavigationCount?: IntFilter<"AssessmentSession"> | number
    backNavigationLog?: JsonNullableFilter<"AssessmentSession">
    metadata?: JsonNullableFilter<"AssessmentSession">
    createdAt?: DateTimeFilter<"AssessmentSession"> | Date | string
    updatedAt?: DateTimeFilter<"AssessmentSession"> | Date | string
    completedAt?: DateTimeNullableFilter<"AssessmentSession"> | Date | string | null
    archivedAt?: DateTimeNullableFilter<"AssessmentSession"> | Date | string | null
    result?: XOR<AssessmentResultNullableRelationFilter, AssessmentResultWhereInput> | null
  }, "id">

  export type AssessmentSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    clerkUserId?: SortOrderInput | SortOrder
    status?: SortOrder
    isCurrent?: SortOrder
    responses?: SortOrder
    demographics?: SortOrderInput | SortOrder
    pendingQuestions?: SortOrderInput | SortOrder
    answerHistory?: SortOrderInput | SortOrder
    backNavigationCount?: SortOrder
    backNavigationLog?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    archivedAt?: SortOrderInput | SortOrder
    _count?: AssessmentSessionCountOrderByAggregateInput
    _avg?: AssessmentSessionAvgOrderByAggregateInput
    _max?: AssessmentSessionMaxOrderByAggregateInput
    _min?: AssessmentSessionMinOrderByAggregateInput
    _sum?: AssessmentSessionSumOrderByAggregateInput
  }

  export type AssessmentSessionScalarWhereWithAggregatesInput = {
    AND?: AssessmentSessionScalarWhereWithAggregatesInput | AssessmentSessionScalarWhereWithAggregatesInput[]
    OR?: AssessmentSessionScalarWhereWithAggregatesInput[]
    NOT?: AssessmentSessionScalarWhereWithAggregatesInput | AssessmentSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AssessmentSession"> | string
    userId?: StringNullableWithAggregatesFilter<"AssessmentSession"> | string | null
    clerkUserId?: StringNullableWithAggregatesFilter<"AssessmentSession"> | string | null
    status?: StringWithAggregatesFilter<"AssessmentSession"> | string
    isCurrent?: BoolWithAggregatesFilter<"AssessmentSession"> | boolean
    responses?: JsonWithAggregatesFilter<"AssessmentSession">
    demographics?: JsonNullableWithAggregatesFilter<"AssessmentSession">
    pendingQuestions?: JsonNullableWithAggregatesFilter<"AssessmentSession">
    answerHistory?: JsonNullableWithAggregatesFilter<"AssessmentSession">
    backNavigationCount?: IntWithAggregatesFilter<"AssessmentSession"> | number
    backNavigationLog?: JsonNullableWithAggregatesFilter<"AssessmentSession">
    metadata?: JsonNullableWithAggregatesFilter<"AssessmentSession">
    createdAt?: DateTimeWithAggregatesFilter<"AssessmentSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AssessmentSession"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"AssessmentSession"> | Date | string | null
    archivedAt?: DateTimeNullableWithAggregatesFilter<"AssessmentSession"> | Date | string | null
  }

  export type AssessmentResultWhereInput = {
    AND?: AssessmentResultWhereInput | AssessmentResultWhereInput[]
    OR?: AssessmentResultWhereInput[]
    NOT?: AssessmentResultWhereInput | AssessmentResultWhereInput[]
    id?: StringFilter<"AssessmentResult"> | string
    sessionId?: StringFilter<"AssessmentResult"> | string
    userId?: StringNullableFilter<"AssessmentResult"> | string | null
    clerkUserId?: StringNullableFilter<"AssessmentResult"> | string | null
    isCurrent?: BoolFilter<"AssessmentResult"> | boolean
    scoreLumen?: FloatFilter<"AssessmentResult"> | number
    scoreAether?: FloatFilter<"AssessmentResult"> | number
    scoreOrpheus?: FloatFilter<"AssessmentResult"> | number
    scoreOrin?: FloatFilter<"AssessmentResult"> | number
    scoreLyra?: FloatFilter<"AssessmentResult"> | number
    scoreVara?: FloatFilter<"AssessmentResult"> | number
    scoreChronos?: FloatFilter<"AssessmentResult"> | number
    scoreKael?: FloatFilter<"AssessmentResult"> | number
    narrative?: JsonFilter<"AssessmentResult">
    archetype?: StringNullableFilter<"AssessmentResult"> | string | null
    profilePattern?: StringNullableFilter<"AssessmentResult"> | string | null
    consistencyScore?: FloatNullableFilter<"AssessmentResult"> | number | null
    attentionScore?: FloatNullableFilter<"AssessmentResult"> | number | null
    validationFlags?: JsonNullableFilter<"AssessmentResult">
    generationCost?: FloatNullableFilter<"AssessmentResult"> | number | null
    generationModel?: StringNullableFilter<"AssessmentResult"> | string | null
    createdAt?: DateTimeFilter<"AssessmentResult"> | Date | string
    updatedAt?: DateTimeFilter<"AssessmentResult"> | Date | string
    session?: XOR<AssessmentSessionRelationFilter, AssessmentSessionWhereInput>
  }

  export type AssessmentResultOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrderInput | SortOrder
    clerkUserId?: SortOrderInput | SortOrder
    isCurrent?: SortOrder
    scoreLumen?: SortOrder
    scoreAether?: SortOrder
    scoreOrpheus?: SortOrder
    scoreOrin?: SortOrder
    scoreLyra?: SortOrder
    scoreVara?: SortOrder
    scoreChronos?: SortOrder
    scoreKael?: SortOrder
    narrative?: SortOrder
    archetype?: SortOrderInput | SortOrder
    profilePattern?: SortOrderInput | SortOrder
    consistencyScore?: SortOrderInput | SortOrder
    attentionScore?: SortOrderInput | SortOrder
    validationFlags?: SortOrderInput | SortOrder
    generationCost?: SortOrderInput | SortOrder
    generationModel?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    session?: AssessmentSessionOrderByWithRelationInput
  }

  export type AssessmentResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId?: string
    AND?: AssessmentResultWhereInput | AssessmentResultWhereInput[]
    OR?: AssessmentResultWhereInput[]
    NOT?: AssessmentResultWhereInput | AssessmentResultWhereInput[]
    userId?: StringNullableFilter<"AssessmentResult"> | string | null
    clerkUserId?: StringNullableFilter<"AssessmentResult"> | string | null
    isCurrent?: BoolFilter<"AssessmentResult"> | boolean
    scoreLumen?: FloatFilter<"AssessmentResult"> | number
    scoreAether?: FloatFilter<"AssessmentResult"> | number
    scoreOrpheus?: FloatFilter<"AssessmentResult"> | number
    scoreOrin?: FloatFilter<"AssessmentResult"> | number
    scoreLyra?: FloatFilter<"AssessmentResult"> | number
    scoreVara?: FloatFilter<"AssessmentResult"> | number
    scoreChronos?: FloatFilter<"AssessmentResult"> | number
    scoreKael?: FloatFilter<"AssessmentResult"> | number
    narrative?: JsonFilter<"AssessmentResult">
    archetype?: StringNullableFilter<"AssessmentResult"> | string | null
    profilePattern?: StringNullableFilter<"AssessmentResult"> | string | null
    consistencyScore?: FloatNullableFilter<"AssessmentResult"> | number | null
    attentionScore?: FloatNullableFilter<"AssessmentResult"> | number | null
    validationFlags?: JsonNullableFilter<"AssessmentResult">
    generationCost?: FloatNullableFilter<"AssessmentResult"> | number | null
    generationModel?: StringNullableFilter<"AssessmentResult"> | string | null
    createdAt?: DateTimeFilter<"AssessmentResult"> | Date | string
    updatedAt?: DateTimeFilter<"AssessmentResult"> | Date | string
    session?: XOR<AssessmentSessionRelationFilter, AssessmentSessionWhereInput>
  }, "id" | "sessionId">

  export type AssessmentResultOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrderInput | SortOrder
    clerkUserId?: SortOrderInput | SortOrder
    isCurrent?: SortOrder
    scoreLumen?: SortOrder
    scoreAether?: SortOrder
    scoreOrpheus?: SortOrder
    scoreOrin?: SortOrder
    scoreLyra?: SortOrder
    scoreVara?: SortOrder
    scoreChronos?: SortOrder
    scoreKael?: SortOrder
    narrative?: SortOrder
    archetype?: SortOrderInput | SortOrder
    profilePattern?: SortOrderInput | SortOrder
    consistencyScore?: SortOrderInput | SortOrder
    attentionScore?: SortOrderInput | SortOrder
    validationFlags?: SortOrderInput | SortOrder
    generationCost?: SortOrderInput | SortOrder
    generationModel?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AssessmentResultCountOrderByAggregateInput
    _avg?: AssessmentResultAvgOrderByAggregateInput
    _max?: AssessmentResultMaxOrderByAggregateInput
    _min?: AssessmentResultMinOrderByAggregateInput
    _sum?: AssessmentResultSumOrderByAggregateInput
  }

  export type AssessmentResultScalarWhereWithAggregatesInput = {
    AND?: AssessmentResultScalarWhereWithAggregatesInput | AssessmentResultScalarWhereWithAggregatesInput[]
    OR?: AssessmentResultScalarWhereWithAggregatesInput[]
    NOT?: AssessmentResultScalarWhereWithAggregatesInput | AssessmentResultScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AssessmentResult"> | string
    sessionId?: StringWithAggregatesFilter<"AssessmentResult"> | string
    userId?: StringNullableWithAggregatesFilter<"AssessmentResult"> | string | null
    clerkUserId?: StringNullableWithAggregatesFilter<"AssessmentResult"> | string | null
    isCurrent?: BoolWithAggregatesFilter<"AssessmentResult"> | boolean
    scoreLumen?: FloatWithAggregatesFilter<"AssessmentResult"> | number
    scoreAether?: FloatWithAggregatesFilter<"AssessmentResult"> | number
    scoreOrpheus?: FloatWithAggregatesFilter<"AssessmentResult"> | number
    scoreOrin?: FloatWithAggregatesFilter<"AssessmentResult"> | number
    scoreLyra?: FloatWithAggregatesFilter<"AssessmentResult"> | number
    scoreVara?: FloatWithAggregatesFilter<"AssessmentResult"> | number
    scoreChronos?: FloatWithAggregatesFilter<"AssessmentResult"> | number
    scoreKael?: FloatWithAggregatesFilter<"AssessmentResult"> | number
    narrative?: JsonWithAggregatesFilter<"AssessmentResult">
    archetype?: StringNullableWithAggregatesFilter<"AssessmentResult"> | string | null
    profilePattern?: StringNullableWithAggregatesFilter<"AssessmentResult"> | string | null
    consistencyScore?: FloatNullableWithAggregatesFilter<"AssessmentResult"> | number | null
    attentionScore?: FloatNullableWithAggregatesFilter<"AssessmentResult"> | number | null
    validationFlags?: JsonNullableWithAggregatesFilter<"AssessmentResult">
    generationCost?: FloatNullableWithAggregatesFilter<"AssessmentResult"> | number | null
    generationModel?: StringNullableWithAggregatesFilter<"AssessmentResult"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AssessmentResult"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AssessmentResult"> | Date | string
  }

  export type AssessmentTemplateWhereInput = {
    AND?: AssessmentTemplateWhereInput | AssessmentTemplateWhereInput[]
    OR?: AssessmentTemplateWhereInput[]
    NOT?: AssessmentTemplateWhereInput | AssessmentTemplateWhereInput[]
    id?: StringFilter<"AssessmentTemplate"> | string
    name?: StringFilter<"AssessmentTemplate"> | string
    description?: StringNullableFilter<"AssessmentTemplate"> | string | null
    version?: StringFilter<"AssessmentTemplate"> | string
    items?: JsonFilter<"AssessmentTemplate">
    dimensions?: JsonFilter<"AssessmentTemplate">
    minItemsPerDimension?: IntFilter<"AssessmentTemplate"> | number
    maxTotalItems?: IntFilter<"AssessmentTemplate"> | number
    uncertaintyThreshold?: FloatFilter<"AssessmentTemplate"> | number
    isActive?: BoolFilter<"AssessmentTemplate"> | boolean
    createdAt?: DateTimeFilter<"AssessmentTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"AssessmentTemplate"> | Date | string
  }

  export type AssessmentTemplateOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    version?: SortOrder
    items?: SortOrder
    dimensions?: SortOrder
    minItemsPerDimension?: SortOrder
    maxTotalItems?: SortOrder
    uncertaintyThreshold?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: AssessmentTemplateWhereInput | AssessmentTemplateWhereInput[]
    OR?: AssessmentTemplateWhereInput[]
    NOT?: AssessmentTemplateWhereInput | AssessmentTemplateWhereInput[]
    description?: StringNullableFilter<"AssessmentTemplate"> | string | null
    version?: StringFilter<"AssessmentTemplate"> | string
    items?: JsonFilter<"AssessmentTemplate">
    dimensions?: JsonFilter<"AssessmentTemplate">
    minItemsPerDimension?: IntFilter<"AssessmentTemplate"> | number
    maxTotalItems?: IntFilter<"AssessmentTemplate"> | number
    uncertaintyThreshold?: FloatFilter<"AssessmentTemplate"> | number
    isActive?: BoolFilter<"AssessmentTemplate"> | boolean
    createdAt?: DateTimeFilter<"AssessmentTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"AssessmentTemplate"> | Date | string
  }, "id" | "name">

  export type AssessmentTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    version?: SortOrder
    items?: SortOrder
    dimensions?: SortOrder
    minItemsPerDimension?: SortOrder
    maxTotalItems?: SortOrder
    uncertaintyThreshold?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AssessmentTemplateCountOrderByAggregateInput
    _avg?: AssessmentTemplateAvgOrderByAggregateInput
    _max?: AssessmentTemplateMaxOrderByAggregateInput
    _min?: AssessmentTemplateMinOrderByAggregateInput
    _sum?: AssessmentTemplateSumOrderByAggregateInput
  }

  export type AssessmentTemplateScalarWhereWithAggregatesInput = {
    AND?: AssessmentTemplateScalarWhereWithAggregatesInput | AssessmentTemplateScalarWhereWithAggregatesInput[]
    OR?: AssessmentTemplateScalarWhereWithAggregatesInput[]
    NOT?: AssessmentTemplateScalarWhereWithAggregatesInput | AssessmentTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AssessmentTemplate"> | string
    name?: StringWithAggregatesFilter<"AssessmentTemplate"> | string
    description?: StringNullableWithAggregatesFilter<"AssessmentTemplate"> | string | null
    version?: StringWithAggregatesFilter<"AssessmentTemplate"> | string
    items?: JsonWithAggregatesFilter<"AssessmentTemplate">
    dimensions?: JsonWithAggregatesFilter<"AssessmentTemplate">
    minItemsPerDimension?: IntWithAggregatesFilter<"AssessmentTemplate"> | number
    maxTotalItems?: IntWithAggregatesFilter<"AssessmentTemplate"> | number
    uncertaintyThreshold?: FloatWithAggregatesFilter<"AssessmentTemplate"> | number
    isActive?: BoolWithAggregatesFilter<"AssessmentTemplate"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"AssessmentTemplate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AssessmentTemplate"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkId: string
    inviteLinksSent?: InviteLinkCreateNestedManyWithoutInviterInput
    inviteLinksReceived?: InviteLinkCreateNestedManyWithoutTargetInput
    profile?: ProfileCreateNestedOneWithoutUserInput
    responsesAbout?: ResponseCreateNestedManyWithoutAboutUserInput
    responsesGiven?: ResponseCreateNestedManyWithoutAnsweredByUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkId: string
    inviteLinksSent?: InviteLinkUncheckedCreateNestedManyWithoutInviterInput
    inviteLinksReceived?: InviteLinkUncheckedCreateNestedManyWithoutTargetInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    responsesAbout?: ResponseUncheckedCreateNestedManyWithoutAboutUserInput
    responsesGiven?: ResponseUncheckedCreateNestedManyWithoutAnsweredByUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkId?: StringFieldUpdateOperationsInput | string
    inviteLinksSent?: InviteLinkUpdateManyWithoutInviterNestedInput
    inviteLinksReceived?: InviteLinkUpdateManyWithoutTargetNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
    responsesAbout?: ResponseUpdateManyWithoutAboutUserNestedInput
    responsesGiven?: ResponseUpdateManyWithoutAnsweredByUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkId?: StringFieldUpdateOperationsInput | string
    inviteLinksSent?: InviteLinkUncheckedUpdateManyWithoutInviterNestedInput
    inviteLinksReceived?: InviteLinkUncheckedUpdateManyWithoutTargetNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    responsesAbout?: ResponseUncheckedUpdateManyWithoutAboutUserNestedInput
    responsesGiven?: ResponseUncheckedUpdateManyWithoutAnsweredByUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkId: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkId?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkId?: StringFieldUpdateOperationsInput | string
  }

  export type ProfileCreateInput = {
    id?: string
    bio?: string | null
    avatarUrl?: string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    userId: string
    bio?: string | null
    avatarUrl?: string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateManyInput = {
    id?: string
    userId: string
    bio?: string | null
    avatarUrl?: string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionCreateInput = {
    id?: string
    text: string
    category?: string | null
    isThirdParty?: boolean
    createdAt?: Date | string
    responses?: ResponseCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateInput = {
    id?: string
    text: string
    category?: string | null
    isThirdParty?: boolean
    createdAt?: Date | string
    responses?: ResponseUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isThirdParty?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responses?: ResponseUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isThirdParty?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responses?: ResponseUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionCreateManyInput = {
    id?: string
    text: string
    category?: string | null
    isThirdParty?: boolean
    createdAt?: Date | string
  }

  export type QuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isThirdParty?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isThirdParty?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseCreateInput = {
    id?: string
    answer: string
    notSure?: boolean
    responseTime?: number | null
    qualityScore?: number | null
    flaggedMalicious?: boolean
    createdAt?: Date | string
    aboutUser: UserCreateNestedOneWithoutResponsesAboutInput
    answeredByUser: UserCreateNestedOneWithoutResponsesGivenInput
    question: QuestionCreateNestedOneWithoutResponsesInput
  }

  export type ResponseUncheckedCreateInput = {
    id?: string
    questionId: string
    answeredById: string
    aboutUserId: string
    answer: string
    notSure?: boolean
    responseTime?: number | null
    qualityScore?: number | null
    flaggedMalicious?: boolean
    createdAt?: Date | string
  }

  export type ResponseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    notSure?: BoolFieldUpdateOperationsInput | boolean
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    flaggedMalicious?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aboutUser?: UserUpdateOneRequiredWithoutResponsesAboutNestedInput
    answeredByUser?: UserUpdateOneRequiredWithoutResponsesGivenNestedInput
    question?: QuestionUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type ResponseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answeredById?: StringFieldUpdateOperationsInput | string
    aboutUserId?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    notSure?: BoolFieldUpdateOperationsInput | boolean
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    flaggedMalicious?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseCreateManyInput = {
    id?: string
    questionId: string
    answeredById: string
    aboutUserId: string
    answer: string
    notSure?: boolean
    responseTime?: number | null
    qualityScore?: number | null
    flaggedMalicious?: boolean
    createdAt?: Date | string
  }

  export type ResponseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    notSure?: BoolFieldUpdateOperationsInput | boolean
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    flaggedMalicious?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answeredById?: StringFieldUpdateOperationsInput | string
    aboutUserId?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    notSure?: BoolFieldUpdateOperationsInput | boolean
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    flaggedMalicious?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InviteLinkCreateInput = {
    id?: string
    inviteCode: string
    status?: string
    expiresAt: Date | string
    completedAt?: Date | string | null
    friendEmail?: string | null
    friendNickname?: string | null
    relationshipType?: string | null
    openedAt?: Date | string | null
    startedAt?: Date | string | null
    abandonedAt?: Date | string | null
    deviceType?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviter: UserCreateNestedOneWithoutInviteLinksSentInput
    target?: UserCreateNestedOneWithoutInviteLinksReceivedInput
  }

  export type InviteLinkUncheckedCreateInput = {
    id?: string
    inviteCode: string
    inviterId: string
    targetId?: string | null
    status?: string
    expiresAt: Date | string
    completedAt?: Date | string | null
    friendEmail?: string | null
    friendNickname?: string | null
    relationshipType?: string | null
    openedAt?: Date | string | null
    startedAt?: Date | string | null
    abandonedAt?: Date | string | null
    deviceType?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InviteLinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    friendEmail?: NullableStringFieldUpdateOperationsInput | string | null
    friendNickname?: NullableStringFieldUpdateOperationsInput | string | null
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    openedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abandonedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviter?: UserUpdateOneRequiredWithoutInviteLinksSentNestedInput
    target?: UserUpdateOneWithoutInviteLinksReceivedNestedInput
  }

  export type InviteLinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    friendEmail?: NullableStringFieldUpdateOperationsInput | string | null
    friendNickname?: NullableStringFieldUpdateOperationsInput | string | null
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    openedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abandonedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InviteLinkCreateManyInput = {
    id?: string
    inviteCode: string
    inviterId: string
    targetId?: string | null
    status?: string
    expiresAt: Date | string
    completedAt?: Date | string | null
    friendEmail?: string | null
    friendNickname?: string | null
    relationshipType?: string | null
    openedAt?: Date | string | null
    startedAt?: Date | string | null
    abandonedAt?: Date | string | null
    deviceType?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InviteLinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    friendEmail?: NullableStringFieldUpdateOperationsInput | string | null
    friendNickname?: NullableStringFieldUpdateOperationsInput | string | null
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    openedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abandonedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InviteLinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    friendEmail?: NullableStringFieldUpdateOperationsInput | string | null
    friendNickname?: NullableStringFieldUpdateOperationsInput | string | null
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    openedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abandonedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateLimitCreateInput = {
    id?: string
    userId: string
    invitesSent?: number
    windowStart: Date | string
    windowEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RateLimitUncheckedCreateInput = {
    id?: string
    userId: string
    invitesSent?: number
    windowStart: Date | string
    windowEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RateLimitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    invitesSent?: IntFieldUpdateOperationsInput | number
    windowStart?: DateTimeFieldUpdateOperationsInput | Date | string
    windowEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateLimitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    invitesSent?: IntFieldUpdateOperationsInput | number
    windowStart?: DateTimeFieldUpdateOperationsInput | Date | string
    windowEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateLimitCreateManyInput = {
    id?: string
    userId: string
    invitesSent?: number
    windowStart: Date | string
    windowEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RateLimitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    invitesSent?: IntFieldUpdateOperationsInput | number
    windowStart?: DateTimeFieldUpdateOperationsInput | Date | string
    windowEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateLimitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    invitesSent?: IntFieldUpdateOperationsInput | number
    windowStart?: DateTimeFieldUpdateOperationsInput | Date | string
    windowEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentSessionCreateInput = {
    id?: string
    userId?: string | null
    clerkUserId?: string | null
    status?: string
    isCurrent?: boolean
    responses: JsonNullValueInput | InputJsonValue
    demographics?: NullableJsonNullValueInput | InputJsonValue
    pendingQuestions?: NullableJsonNullValueInput | InputJsonValue
    answerHistory?: NullableJsonNullValueInput | InputJsonValue
    backNavigationCount?: number
    backNavigationLog?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    archivedAt?: Date | string | null
    result?: AssessmentResultCreateNestedOneWithoutSessionInput
  }

  export type AssessmentSessionUncheckedCreateInput = {
    id?: string
    userId?: string | null
    clerkUserId?: string | null
    status?: string
    isCurrent?: boolean
    responses: JsonNullValueInput | InputJsonValue
    demographics?: NullableJsonNullValueInput | InputJsonValue
    pendingQuestions?: NullableJsonNullValueInput | InputJsonValue
    answerHistory?: NullableJsonNullValueInput | InputJsonValue
    backNavigationCount?: number
    backNavigationLog?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    archivedAt?: Date | string | null
    result?: AssessmentResultUncheckedCreateNestedOneWithoutSessionInput
  }

  export type AssessmentSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    responses?: JsonNullValueInput | InputJsonValue
    demographics?: NullableJsonNullValueInput | InputJsonValue
    pendingQuestions?: NullableJsonNullValueInput | InputJsonValue
    answerHistory?: NullableJsonNullValueInput | InputJsonValue
    backNavigationCount?: IntFieldUpdateOperationsInput | number
    backNavigationLog?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: AssessmentResultUpdateOneWithoutSessionNestedInput
  }

  export type AssessmentSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    responses?: JsonNullValueInput | InputJsonValue
    demographics?: NullableJsonNullValueInput | InputJsonValue
    pendingQuestions?: NullableJsonNullValueInput | InputJsonValue
    answerHistory?: NullableJsonNullValueInput | InputJsonValue
    backNavigationCount?: IntFieldUpdateOperationsInput | number
    backNavigationLog?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: AssessmentResultUncheckedUpdateOneWithoutSessionNestedInput
  }

  export type AssessmentSessionCreateManyInput = {
    id?: string
    userId?: string | null
    clerkUserId?: string | null
    status?: string
    isCurrent?: boolean
    responses: JsonNullValueInput | InputJsonValue
    demographics?: NullableJsonNullValueInput | InputJsonValue
    pendingQuestions?: NullableJsonNullValueInput | InputJsonValue
    answerHistory?: NullableJsonNullValueInput | InputJsonValue
    backNavigationCount?: number
    backNavigationLog?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    archivedAt?: Date | string | null
  }

  export type AssessmentSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    responses?: JsonNullValueInput | InputJsonValue
    demographics?: NullableJsonNullValueInput | InputJsonValue
    pendingQuestions?: NullableJsonNullValueInput | InputJsonValue
    answerHistory?: NullableJsonNullValueInput | InputJsonValue
    backNavigationCount?: IntFieldUpdateOperationsInput | number
    backNavigationLog?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AssessmentSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    responses?: JsonNullValueInput | InputJsonValue
    demographics?: NullableJsonNullValueInput | InputJsonValue
    pendingQuestions?: NullableJsonNullValueInput | InputJsonValue
    answerHistory?: NullableJsonNullValueInput | InputJsonValue
    backNavigationCount?: IntFieldUpdateOperationsInput | number
    backNavigationLog?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AssessmentResultCreateInput = {
    id?: string
    userId?: string | null
    clerkUserId?: string | null
    isCurrent?: boolean
    scoreLumen: number
    scoreAether: number
    scoreOrpheus: number
    scoreOrin: number
    scoreLyra: number
    scoreVara: number
    scoreChronos: number
    scoreKael: number
    narrative: JsonNullValueInput | InputJsonValue
    archetype?: string | null
    profilePattern?: string | null
    consistencyScore?: number | null
    attentionScore?: number | null
    validationFlags?: NullableJsonNullValueInput | InputJsonValue
    generationCost?: number | null
    generationModel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    session: AssessmentSessionCreateNestedOneWithoutResultInput
  }

  export type AssessmentResultUncheckedCreateInput = {
    id?: string
    sessionId: string
    userId?: string | null
    clerkUserId?: string | null
    isCurrent?: boolean
    scoreLumen: number
    scoreAether: number
    scoreOrpheus: number
    scoreOrin: number
    scoreLyra: number
    scoreVara: number
    scoreChronos: number
    scoreKael: number
    narrative: JsonNullValueInput | InputJsonValue
    archetype?: string | null
    profilePattern?: string | null
    consistencyScore?: number | null
    attentionScore?: number | null
    validationFlags?: NullableJsonNullValueInput | InputJsonValue
    generationCost?: number | null
    generationModel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentResultUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    scoreLumen?: FloatFieldUpdateOperationsInput | number
    scoreAether?: FloatFieldUpdateOperationsInput | number
    scoreOrpheus?: FloatFieldUpdateOperationsInput | number
    scoreOrin?: FloatFieldUpdateOperationsInput | number
    scoreLyra?: FloatFieldUpdateOperationsInput | number
    scoreVara?: FloatFieldUpdateOperationsInput | number
    scoreChronos?: FloatFieldUpdateOperationsInput | number
    scoreKael?: FloatFieldUpdateOperationsInput | number
    narrative?: JsonNullValueInput | InputJsonValue
    archetype?: NullableStringFieldUpdateOperationsInput | string | null
    profilePattern?: NullableStringFieldUpdateOperationsInput | string | null
    consistencyScore?: NullableFloatFieldUpdateOperationsInput | number | null
    attentionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    validationFlags?: NullableJsonNullValueInput | InputJsonValue
    generationCost?: NullableFloatFieldUpdateOperationsInput | number | null
    generationModel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: AssessmentSessionUpdateOneRequiredWithoutResultNestedInput
  }

  export type AssessmentResultUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    scoreLumen?: FloatFieldUpdateOperationsInput | number
    scoreAether?: FloatFieldUpdateOperationsInput | number
    scoreOrpheus?: FloatFieldUpdateOperationsInput | number
    scoreOrin?: FloatFieldUpdateOperationsInput | number
    scoreLyra?: FloatFieldUpdateOperationsInput | number
    scoreVara?: FloatFieldUpdateOperationsInput | number
    scoreChronos?: FloatFieldUpdateOperationsInput | number
    scoreKael?: FloatFieldUpdateOperationsInput | number
    narrative?: JsonNullValueInput | InputJsonValue
    archetype?: NullableStringFieldUpdateOperationsInput | string | null
    profilePattern?: NullableStringFieldUpdateOperationsInput | string | null
    consistencyScore?: NullableFloatFieldUpdateOperationsInput | number | null
    attentionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    validationFlags?: NullableJsonNullValueInput | InputJsonValue
    generationCost?: NullableFloatFieldUpdateOperationsInput | number | null
    generationModel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentResultCreateManyInput = {
    id?: string
    sessionId: string
    userId?: string | null
    clerkUserId?: string | null
    isCurrent?: boolean
    scoreLumen: number
    scoreAether: number
    scoreOrpheus: number
    scoreOrin: number
    scoreLyra: number
    scoreVara: number
    scoreChronos: number
    scoreKael: number
    narrative: JsonNullValueInput | InputJsonValue
    archetype?: string | null
    profilePattern?: string | null
    consistencyScore?: number | null
    attentionScore?: number | null
    validationFlags?: NullableJsonNullValueInput | InputJsonValue
    generationCost?: number | null
    generationModel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentResultUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    scoreLumen?: FloatFieldUpdateOperationsInput | number
    scoreAether?: FloatFieldUpdateOperationsInput | number
    scoreOrpheus?: FloatFieldUpdateOperationsInput | number
    scoreOrin?: FloatFieldUpdateOperationsInput | number
    scoreLyra?: FloatFieldUpdateOperationsInput | number
    scoreVara?: FloatFieldUpdateOperationsInput | number
    scoreChronos?: FloatFieldUpdateOperationsInput | number
    scoreKael?: FloatFieldUpdateOperationsInput | number
    narrative?: JsonNullValueInput | InputJsonValue
    archetype?: NullableStringFieldUpdateOperationsInput | string | null
    profilePattern?: NullableStringFieldUpdateOperationsInput | string | null
    consistencyScore?: NullableFloatFieldUpdateOperationsInput | number | null
    attentionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    validationFlags?: NullableJsonNullValueInput | InputJsonValue
    generationCost?: NullableFloatFieldUpdateOperationsInput | number | null
    generationModel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentResultUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    scoreLumen?: FloatFieldUpdateOperationsInput | number
    scoreAether?: FloatFieldUpdateOperationsInput | number
    scoreOrpheus?: FloatFieldUpdateOperationsInput | number
    scoreOrin?: FloatFieldUpdateOperationsInput | number
    scoreLyra?: FloatFieldUpdateOperationsInput | number
    scoreVara?: FloatFieldUpdateOperationsInput | number
    scoreChronos?: FloatFieldUpdateOperationsInput | number
    scoreKael?: FloatFieldUpdateOperationsInput | number
    narrative?: JsonNullValueInput | InputJsonValue
    archetype?: NullableStringFieldUpdateOperationsInput | string | null
    profilePattern?: NullableStringFieldUpdateOperationsInput | string | null
    consistencyScore?: NullableFloatFieldUpdateOperationsInput | number | null
    attentionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    validationFlags?: NullableJsonNullValueInput | InputJsonValue
    generationCost?: NullableFloatFieldUpdateOperationsInput | number | null
    generationModel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentTemplateCreateInput = {
    id?: string
    name: string
    description?: string | null
    version?: string
    items: JsonNullValueInput | InputJsonValue
    dimensions: JsonNullValueInput | InputJsonValue
    minItemsPerDimension?: number
    maxTotalItems?: number
    uncertaintyThreshold?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentTemplateUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    version?: string
    items: JsonNullValueInput | InputJsonValue
    dimensions: JsonNullValueInput | InputJsonValue
    minItemsPerDimension?: number
    maxTotalItems?: number
    uncertaintyThreshold?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: StringFieldUpdateOperationsInput | string
    items?: JsonNullValueInput | InputJsonValue
    dimensions?: JsonNullValueInput | InputJsonValue
    minItemsPerDimension?: IntFieldUpdateOperationsInput | number
    maxTotalItems?: IntFieldUpdateOperationsInput | number
    uncertaintyThreshold?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: StringFieldUpdateOperationsInput | string
    items?: JsonNullValueInput | InputJsonValue
    dimensions?: JsonNullValueInput | InputJsonValue
    minItemsPerDimension?: IntFieldUpdateOperationsInput | number
    maxTotalItems?: IntFieldUpdateOperationsInput | number
    uncertaintyThreshold?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentTemplateCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    version?: string
    items: JsonNullValueInput | InputJsonValue
    dimensions: JsonNullValueInput | InputJsonValue
    minItemsPerDimension?: number
    maxTotalItems?: number
    uncertaintyThreshold?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: StringFieldUpdateOperationsInput | string
    items?: JsonNullValueInput | InputJsonValue
    dimensions?: JsonNullValueInput | InputJsonValue
    minItemsPerDimension?: IntFieldUpdateOperationsInput | number
    maxTotalItems?: IntFieldUpdateOperationsInput | number
    uncertaintyThreshold?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: StringFieldUpdateOperationsInput | string
    items?: JsonNullValueInput | InputJsonValue
    dimensions?: JsonNullValueInput | InputJsonValue
    minItemsPerDimension?: IntFieldUpdateOperationsInput | number
    maxTotalItems?: IntFieldUpdateOperationsInput | number
    uncertaintyThreshold?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type InviteLinkListRelationFilter = {
    every?: InviteLinkWhereInput
    some?: InviteLinkWhereInput
    none?: InviteLinkWhereInput
  }

  export type ProfileNullableRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type ResponseListRelationFilter = {
    every?: ResponseWhereInput
    some?: ResponseWhereInput
    none?: ResponseWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type InviteLinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResponseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clerkId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clerkId?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clerkId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    avatarUrl?: SortOrder
    personality?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type QuestionCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    category?: SortOrder
    isThirdParty?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    category?: SortOrder
    isThirdParty?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestionMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    category?: SortOrder
    isThirdParty?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type QuestionRelationFilter = {
    is?: QuestionWhereInput
    isNot?: QuestionWhereInput
  }

  export type ResponseCountOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    answeredById?: SortOrder
    aboutUserId?: SortOrder
    answer?: SortOrder
    notSure?: SortOrder
    responseTime?: SortOrder
    qualityScore?: SortOrder
    flaggedMalicious?: SortOrder
    createdAt?: SortOrder
  }

  export type ResponseAvgOrderByAggregateInput = {
    responseTime?: SortOrder
    qualityScore?: SortOrder
  }

  export type ResponseMaxOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    answeredById?: SortOrder
    aboutUserId?: SortOrder
    answer?: SortOrder
    notSure?: SortOrder
    responseTime?: SortOrder
    qualityScore?: SortOrder
    flaggedMalicious?: SortOrder
    createdAt?: SortOrder
  }

  export type ResponseMinOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    answeredById?: SortOrder
    aboutUserId?: SortOrder
    answer?: SortOrder
    notSure?: SortOrder
    responseTime?: SortOrder
    qualityScore?: SortOrder
    flaggedMalicious?: SortOrder
    createdAt?: SortOrder
  }

  export type ResponseSumOrderByAggregateInput = {
    responseTime?: SortOrder
    qualityScore?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type InviteLinkCountOrderByAggregateInput = {
    id?: SortOrder
    inviteCode?: SortOrder
    inviterId?: SortOrder
    targetId?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    completedAt?: SortOrder
    friendEmail?: SortOrder
    friendNickname?: SortOrder
    relationshipType?: SortOrder
    openedAt?: SortOrder
    startedAt?: SortOrder
    abandonedAt?: SortOrder
    deviceType?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InviteLinkMaxOrderByAggregateInput = {
    id?: SortOrder
    inviteCode?: SortOrder
    inviterId?: SortOrder
    targetId?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    completedAt?: SortOrder
    friendEmail?: SortOrder
    friendNickname?: SortOrder
    relationshipType?: SortOrder
    openedAt?: SortOrder
    startedAt?: SortOrder
    abandonedAt?: SortOrder
    deviceType?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InviteLinkMinOrderByAggregateInput = {
    id?: SortOrder
    inviteCode?: SortOrder
    inviterId?: SortOrder
    targetId?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    completedAt?: SortOrder
    friendEmail?: SortOrder
    friendNickname?: SortOrder
    relationshipType?: SortOrder
    openedAt?: SortOrder
    startedAt?: SortOrder
    abandonedAt?: SortOrder
    deviceType?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type RateLimitUserIdWindowStartCompoundUniqueInput = {
    userId: string
    windowStart: Date | string
  }

  export type RateLimitCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    invitesSent?: SortOrder
    windowStart?: SortOrder
    windowEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RateLimitAvgOrderByAggregateInput = {
    invitesSent?: SortOrder
  }

  export type RateLimitMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    invitesSent?: SortOrder
    windowStart?: SortOrder
    windowEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RateLimitMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    invitesSent?: SortOrder
    windowStart?: SortOrder
    windowEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RateLimitSumOrderByAggregateInput = {
    invitesSent?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AssessmentResultNullableRelationFilter = {
    is?: AssessmentResultWhereInput | null
    isNot?: AssessmentResultWhereInput | null
  }

  export type AssessmentSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    clerkUserId?: SortOrder
    status?: SortOrder
    isCurrent?: SortOrder
    responses?: SortOrder
    demographics?: SortOrder
    pendingQuestions?: SortOrder
    answerHistory?: SortOrder
    backNavigationCount?: SortOrder
    backNavigationLog?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
    archivedAt?: SortOrder
  }

  export type AssessmentSessionAvgOrderByAggregateInput = {
    backNavigationCount?: SortOrder
  }

  export type AssessmentSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    clerkUserId?: SortOrder
    status?: SortOrder
    isCurrent?: SortOrder
    backNavigationCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
    archivedAt?: SortOrder
  }

  export type AssessmentSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    clerkUserId?: SortOrder
    status?: SortOrder
    isCurrent?: SortOrder
    backNavigationCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
    archivedAt?: SortOrder
  }

  export type AssessmentSessionSumOrderByAggregateInput = {
    backNavigationCount?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type AssessmentSessionRelationFilter = {
    is?: AssessmentSessionWhereInput
    isNot?: AssessmentSessionWhereInput
  }

  export type AssessmentResultCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    clerkUserId?: SortOrder
    isCurrent?: SortOrder
    scoreLumen?: SortOrder
    scoreAether?: SortOrder
    scoreOrpheus?: SortOrder
    scoreOrin?: SortOrder
    scoreLyra?: SortOrder
    scoreVara?: SortOrder
    scoreChronos?: SortOrder
    scoreKael?: SortOrder
    narrative?: SortOrder
    archetype?: SortOrder
    profilePattern?: SortOrder
    consistencyScore?: SortOrder
    attentionScore?: SortOrder
    validationFlags?: SortOrder
    generationCost?: SortOrder
    generationModel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentResultAvgOrderByAggregateInput = {
    scoreLumen?: SortOrder
    scoreAether?: SortOrder
    scoreOrpheus?: SortOrder
    scoreOrin?: SortOrder
    scoreLyra?: SortOrder
    scoreVara?: SortOrder
    scoreChronos?: SortOrder
    scoreKael?: SortOrder
    consistencyScore?: SortOrder
    attentionScore?: SortOrder
    generationCost?: SortOrder
  }

  export type AssessmentResultMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    clerkUserId?: SortOrder
    isCurrent?: SortOrder
    scoreLumen?: SortOrder
    scoreAether?: SortOrder
    scoreOrpheus?: SortOrder
    scoreOrin?: SortOrder
    scoreLyra?: SortOrder
    scoreVara?: SortOrder
    scoreChronos?: SortOrder
    scoreKael?: SortOrder
    archetype?: SortOrder
    profilePattern?: SortOrder
    consistencyScore?: SortOrder
    attentionScore?: SortOrder
    generationCost?: SortOrder
    generationModel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentResultMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    clerkUserId?: SortOrder
    isCurrent?: SortOrder
    scoreLumen?: SortOrder
    scoreAether?: SortOrder
    scoreOrpheus?: SortOrder
    scoreOrin?: SortOrder
    scoreLyra?: SortOrder
    scoreVara?: SortOrder
    scoreChronos?: SortOrder
    scoreKael?: SortOrder
    archetype?: SortOrder
    profilePattern?: SortOrder
    consistencyScore?: SortOrder
    attentionScore?: SortOrder
    generationCost?: SortOrder
    generationModel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentResultSumOrderByAggregateInput = {
    scoreLumen?: SortOrder
    scoreAether?: SortOrder
    scoreOrpheus?: SortOrder
    scoreOrin?: SortOrder
    scoreLyra?: SortOrder
    scoreVara?: SortOrder
    scoreChronos?: SortOrder
    scoreKael?: SortOrder
    consistencyScore?: SortOrder
    attentionScore?: SortOrder
    generationCost?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type AssessmentTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    version?: SortOrder
    items?: SortOrder
    dimensions?: SortOrder
    minItemsPerDimension?: SortOrder
    maxTotalItems?: SortOrder
    uncertaintyThreshold?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentTemplateAvgOrderByAggregateInput = {
    minItemsPerDimension?: SortOrder
    maxTotalItems?: SortOrder
    uncertaintyThreshold?: SortOrder
  }

  export type AssessmentTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    version?: SortOrder
    minItemsPerDimension?: SortOrder
    maxTotalItems?: SortOrder
    uncertaintyThreshold?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    version?: SortOrder
    minItemsPerDimension?: SortOrder
    maxTotalItems?: SortOrder
    uncertaintyThreshold?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentTemplateSumOrderByAggregateInput = {
    minItemsPerDimension?: SortOrder
    maxTotalItems?: SortOrder
    uncertaintyThreshold?: SortOrder
  }

  export type InviteLinkCreateNestedManyWithoutInviterInput = {
    create?: XOR<InviteLinkCreateWithoutInviterInput, InviteLinkUncheckedCreateWithoutInviterInput> | InviteLinkCreateWithoutInviterInput[] | InviteLinkUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: InviteLinkCreateOrConnectWithoutInviterInput | InviteLinkCreateOrConnectWithoutInviterInput[]
    createMany?: InviteLinkCreateManyInviterInputEnvelope
    connect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
  }

  export type InviteLinkCreateNestedManyWithoutTargetInput = {
    create?: XOR<InviteLinkCreateWithoutTargetInput, InviteLinkUncheckedCreateWithoutTargetInput> | InviteLinkCreateWithoutTargetInput[] | InviteLinkUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: InviteLinkCreateOrConnectWithoutTargetInput | InviteLinkCreateOrConnectWithoutTargetInput[]
    createMany?: InviteLinkCreateManyTargetInputEnvelope
    connect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
  }

  export type ProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type ResponseCreateNestedManyWithoutAboutUserInput = {
    create?: XOR<ResponseCreateWithoutAboutUserInput, ResponseUncheckedCreateWithoutAboutUserInput> | ResponseCreateWithoutAboutUserInput[] | ResponseUncheckedCreateWithoutAboutUserInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutAboutUserInput | ResponseCreateOrConnectWithoutAboutUserInput[]
    createMany?: ResponseCreateManyAboutUserInputEnvelope
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
  }

  export type ResponseCreateNestedManyWithoutAnsweredByUserInput = {
    create?: XOR<ResponseCreateWithoutAnsweredByUserInput, ResponseUncheckedCreateWithoutAnsweredByUserInput> | ResponseCreateWithoutAnsweredByUserInput[] | ResponseUncheckedCreateWithoutAnsweredByUserInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutAnsweredByUserInput | ResponseCreateOrConnectWithoutAnsweredByUserInput[]
    createMany?: ResponseCreateManyAnsweredByUserInputEnvelope
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
  }

  export type InviteLinkUncheckedCreateNestedManyWithoutInviterInput = {
    create?: XOR<InviteLinkCreateWithoutInviterInput, InviteLinkUncheckedCreateWithoutInviterInput> | InviteLinkCreateWithoutInviterInput[] | InviteLinkUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: InviteLinkCreateOrConnectWithoutInviterInput | InviteLinkCreateOrConnectWithoutInviterInput[]
    createMany?: InviteLinkCreateManyInviterInputEnvelope
    connect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
  }

  export type InviteLinkUncheckedCreateNestedManyWithoutTargetInput = {
    create?: XOR<InviteLinkCreateWithoutTargetInput, InviteLinkUncheckedCreateWithoutTargetInput> | InviteLinkCreateWithoutTargetInput[] | InviteLinkUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: InviteLinkCreateOrConnectWithoutTargetInput | InviteLinkCreateOrConnectWithoutTargetInput[]
    createMany?: InviteLinkCreateManyTargetInputEnvelope
    connect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
  }

  export type ProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type ResponseUncheckedCreateNestedManyWithoutAboutUserInput = {
    create?: XOR<ResponseCreateWithoutAboutUserInput, ResponseUncheckedCreateWithoutAboutUserInput> | ResponseCreateWithoutAboutUserInput[] | ResponseUncheckedCreateWithoutAboutUserInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutAboutUserInput | ResponseCreateOrConnectWithoutAboutUserInput[]
    createMany?: ResponseCreateManyAboutUserInputEnvelope
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
  }

  export type ResponseUncheckedCreateNestedManyWithoutAnsweredByUserInput = {
    create?: XOR<ResponseCreateWithoutAnsweredByUserInput, ResponseUncheckedCreateWithoutAnsweredByUserInput> | ResponseCreateWithoutAnsweredByUserInput[] | ResponseUncheckedCreateWithoutAnsweredByUserInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutAnsweredByUserInput | ResponseCreateOrConnectWithoutAnsweredByUserInput[]
    createMany?: ResponseCreateManyAnsweredByUserInputEnvelope
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type InviteLinkUpdateManyWithoutInviterNestedInput = {
    create?: XOR<InviteLinkCreateWithoutInviterInput, InviteLinkUncheckedCreateWithoutInviterInput> | InviteLinkCreateWithoutInviterInput[] | InviteLinkUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: InviteLinkCreateOrConnectWithoutInviterInput | InviteLinkCreateOrConnectWithoutInviterInput[]
    upsert?: InviteLinkUpsertWithWhereUniqueWithoutInviterInput | InviteLinkUpsertWithWhereUniqueWithoutInviterInput[]
    createMany?: InviteLinkCreateManyInviterInputEnvelope
    set?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    disconnect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    delete?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    connect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    update?: InviteLinkUpdateWithWhereUniqueWithoutInviterInput | InviteLinkUpdateWithWhereUniqueWithoutInviterInput[]
    updateMany?: InviteLinkUpdateManyWithWhereWithoutInviterInput | InviteLinkUpdateManyWithWhereWithoutInviterInput[]
    deleteMany?: InviteLinkScalarWhereInput | InviteLinkScalarWhereInput[]
  }

  export type InviteLinkUpdateManyWithoutTargetNestedInput = {
    create?: XOR<InviteLinkCreateWithoutTargetInput, InviteLinkUncheckedCreateWithoutTargetInput> | InviteLinkCreateWithoutTargetInput[] | InviteLinkUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: InviteLinkCreateOrConnectWithoutTargetInput | InviteLinkCreateOrConnectWithoutTargetInput[]
    upsert?: InviteLinkUpsertWithWhereUniqueWithoutTargetInput | InviteLinkUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: InviteLinkCreateManyTargetInputEnvelope
    set?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    disconnect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    delete?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    connect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    update?: InviteLinkUpdateWithWhereUniqueWithoutTargetInput | InviteLinkUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: InviteLinkUpdateManyWithWhereWithoutTargetInput | InviteLinkUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: InviteLinkScalarWhereInput | InviteLinkScalarWhereInput[]
  }

  export type ProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ResponseUpdateManyWithoutAboutUserNestedInput = {
    create?: XOR<ResponseCreateWithoutAboutUserInput, ResponseUncheckedCreateWithoutAboutUserInput> | ResponseCreateWithoutAboutUserInput[] | ResponseUncheckedCreateWithoutAboutUserInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutAboutUserInput | ResponseCreateOrConnectWithoutAboutUserInput[]
    upsert?: ResponseUpsertWithWhereUniqueWithoutAboutUserInput | ResponseUpsertWithWhereUniqueWithoutAboutUserInput[]
    createMany?: ResponseCreateManyAboutUserInputEnvelope
    set?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    disconnect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    delete?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    update?: ResponseUpdateWithWhereUniqueWithoutAboutUserInput | ResponseUpdateWithWhereUniqueWithoutAboutUserInput[]
    updateMany?: ResponseUpdateManyWithWhereWithoutAboutUserInput | ResponseUpdateManyWithWhereWithoutAboutUserInput[]
    deleteMany?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
  }

  export type ResponseUpdateManyWithoutAnsweredByUserNestedInput = {
    create?: XOR<ResponseCreateWithoutAnsweredByUserInput, ResponseUncheckedCreateWithoutAnsweredByUserInput> | ResponseCreateWithoutAnsweredByUserInput[] | ResponseUncheckedCreateWithoutAnsweredByUserInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutAnsweredByUserInput | ResponseCreateOrConnectWithoutAnsweredByUserInput[]
    upsert?: ResponseUpsertWithWhereUniqueWithoutAnsweredByUserInput | ResponseUpsertWithWhereUniqueWithoutAnsweredByUserInput[]
    createMany?: ResponseCreateManyAnsweredByUserInputEnvelope
    set?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    disconnect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    delete?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    update?: ResponseUpdateWithWhereUniqueWithoutAnsweredByUserInput | ResponseUpdateWithWhereUniqueWithoutAnsweredByUserInput[]
    updateMany?: ResponseUpdateManyWithWhereWithoutAnsweredByUserInput | ResponseUpdateManyWithWhereWithoutAnsweredByUserInput[]
    deleteMany?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
  }

  export type InviteLinkUncheckedUpdateManyWithoutInviterNestedInput = {
    create?: XOR<InviteLinkCreateWithoutInviterInput, InviteLinkUncheckedCreateWithoutInviterInput> | InviteLinkCreateWithoutInviterInput[] | InviteLinkUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: InviteLinkCreateOrConnectWithoutInviterInput | InviteLinkCreateOrConnectWithoutInviterInput[]
    upsert?: InviteLinkUpsertWithWhereUniqueWithoutInviterInput | InviteLinkUpsertWithWhereUniqueWithoutInviterInput[]
    createMany?: InviteLinkCreateManyInviterInputEnvelope
    set?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    disconnect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    delete?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    connect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    update?: InviteLinkUpdateWithWhereUniqueWithoutInviterInput | InviteLinkUpdateWithWhereUniqueWithoutInviterInput[]
    updateMany?: InviteLinkUpdateManyWithWhereWithoutInviterInput | InviteLinkUpdateManyWithWhereWithoutInviterInput[]
    deleteMany?: InviteLinkScalarWhereInput | InviteLinkScalarWhereInput[]
  }

  export type InviteLinkUncheckedUpdateManyWithoutTargetNestedInput = {
    create?: XOR<InviteLinkCreateWithoutTargetInput, InviteLinkUncheckedCreateWithoutTargetInput> | InviteLinkCreateWithoutTargetInput[] | InviteLinkUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: InviteLinkCreateOrConnectWithoutTargetInput | InviteLinkCreateOrConnectWithoutTargetInput[]
    upsert?: InviteLinkUpsertWithWhereUniqueWithoutTargetInput | InviteLinkUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: InviteLinkCreateManyTargetInputEnvelope
    set?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    disconnect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    delete?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    connect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    update?: InviteLinkUpdateWithWhereUniqueWithoutTargetInput | InviteLinkUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: InviteLinkUpdateManyWithWhereWithoutTargetInput | InviteLinkUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: InviteLinkScalarWhereInput | InviteLinkScalarWhereInput[]
  }

  export type ProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ResponseUncheckedUpdateManyWithoutAboutUserNestedInput = {
    create?: XOR<ResponseCreateWithoutAboutUserInput, ResponseUncheckedCreateWithoutAboutUserInput> | ResponseCreateWithoutAboutUserInput[] | ResponseUncheckedCreateWithoutAboutUserInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutAboutUserInput | ResponseCreateOrConnectWithoutAboutUserInput[]
    upsert?: ResponseUpsertWithWhereUniqueWithoutAboutUserInput | ResponseUpsertWithWhereUniqueWithoutAboutUserInput[]
    createMany?: ResponseCreateManyAboutUserInputEnvelope
    set?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    disconnect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    delete?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    update?: ResponseUpdateWithWhereUniqueWithoutAboutUserInput | ResponseUpdateWithWhereUniqueWithoutAboutUserInput[]
    updateMany?: ResponseUpdateManyWithWhereWithoutAboutUserInput | ResponseUpdateManyWithWhereWithoutAboutUserInput[]
    deleteMany?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
  }

  export type ResponseUncheckedUpdateManyWithoutAnsweredByUserNestedInput = {
    create?: XOR<ResponseCreateWithoutAnsweredByUserInput, ResponseUncheckedCreateWithoutAnsweredByUserInput> | ResponseCreateWithoutAnsweredByUserInput[] | ResponseUncheckedCreateWithoutAnsweredByUserInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutAnsweredByUserInput | ResponseCreateOrConnectWithoutAnsweredByUserInput[]
    upsert?: ResponseUpsertWithWhereUniqueWithoutAnsweredByUserInput | ResponseUpsertWithWhereUniqueWithoutAnsweredByUserInput[]
    createMany?: ResponseCreateManyAnsweredByUserInputEnvelope
    set?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    disconnect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    delete?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    update?: ResponseUpdateWithWhereUniqueWithoutAnsweredByUserInput | ResponseUpdateWithWhereUniqueWithoutAnsweredByUserInput[]
    updateMany?: ResponseUpdateManyWithWhereWithoutAnsweredByUserInput | ResponseUpdateManyWithWhereWithoutAnsweredByUserInput[]
    deleteMany?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileInput, UserUpdateWithoutProfileInput>, UserUncheckedUpdateWithoutProfileInput>
  }

  export type ResponseCreateNestedManyWithoutQuestionInput = {
    create?: XOR<ResponseCreateWithoutQuestionInput, ResponseUncheckedCreateWithoutQuestionInput> | ResponseCreateWithoutQuestionInput[] | ResponseUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutQuestionInput | ResponseCreateOrConnectWithoutQuestionInput[]
    createMany?: ResponseCreateManyQuestionInputEnvelope
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
  }

  export type ResponseUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<ResponseCreateWithoutQuestionInput, ResponseUncheckedCreateWithoutQuestionInput> | ResponseCreateWithoutQuestionInput[] | ResponseUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutQuestionInput | ResponseCreateOrConnectWithoutQuestionInput[]
    createMany?: ResponseCreateManyQuestionInputEnvelope
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ResponseUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<ResponseCreateWithoutQuestionInput, ResponseUncheckedCreateWithoutQuestionInput> | ResponseCreateWithoutQuestionInput[] | ResponseUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutQuestionInput | ResponseCreateOrConnectWithoutQuestionInput[]
    upsert?: ResponseUpsertWithWhereUniqueWithoutQuestionInput | ResponseUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: ResponseCreateManyQuestionInputEnvelope
    set?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    disconnect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    delete?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    update?: ResponseUpdateWithWhereUniqueWithoutQuestionInput | ResponseUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: ResponseUpdateManyWithWhereWithoutQuestionInput | ResponseUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
  }

  export type ResponseUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<ResponseCreateWithoutQuestionInput, ResponseUncheckedCreateWithoutQuestionInput> | ResponseCreateWithoutQuestionInput[] | ResponseUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutQuestionInput | ResponseCreateOrConnectWithoutQuestionInput[]
    upsert?: ResponseUpsertWithWhereUniqueWithoutQuestionInput | ResponseUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: ResponseCreateManyQuestionInputEnvelope
    set?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    disconnect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    delete?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    update?: ResponseUpdateWithWhereUniqueWithoutQuestionInput | ResponseUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: ResponseUpdateManyWithWhereWithoutQuestionInput | ResponseUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutResponsesAboutInput = {
    create?: XOR<UserCreateWithoutResponsesAboutInput, UserUncheckedCreateWithoutResponsesAboutInput>
    connectOrCreate?: UserCreateOrConnectWithoutResponsesAboutInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutResponsesGivenInput = {
    create?: XOR<UserCreateWithoutResponsesGivenInput, UserUncheckedCreateWithoutResponsesGivenInput>
    connectOrCreate?: UserCreateOrConnectWithoutResponsesGivenInput
    connect?: UserWhereUniqueInput
  }

  export type QuestionCreateNestedOneWithoutResponsesInput = {
    create?: XOR<QuestionCreateWithoutResponsesInput, QuestionUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutResponsesInput
    connect?: QuestionWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutResponsesAboutNestedInput = {
    create?: XOR<UserCreateWithoutResponsesAboutInput, UserUncheckedCreateWithoutResponsesAboutInput>
    connectOrCreate?: UserCreateOrConnectWithoutResponsesAboutInput
    upsert?: UserUpsertWithoutResponsesAboutInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResponsesAboutInput, UserUpdateWithoutResponsesAboutInput>, UserUncheckedUpdateWithoutResponsesAboutInput>
  }

  export type UserUpdateOneRequiredWithoutResponsesGivenNestedInput = {
    create?: XOR<UserCreateWithoutResponsesGivenInput, UserUncheckedCreateWithoutResponsesGivenInput>
    connectOrCreate?: UserCreateOrConnectWithoutResponsesGivenInput
    upsert?: UserUpsertWithoutResponsesGivenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResponsesGivenInput, UserUpdateWithoutResponsesGivenInput>, UserUncheckedUpdateWithoutResponsesGivenInput>
  }

  export type QuestionUpdateOneRequiredWithoutResponsesNestedInput = {
    create?: XOR<QuestionCreateWithoutResponsesInput, QuestionUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutResponsesInput
    upsert?: QuestionUpsertWithoutResponsesInput
    connect?: QuestionWhereUniqueInput
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutResponsesInput, QuestionUpdateWithoutResponsesInput>, QuestionUncheckedUpdateWithoutResponsesInput>
  }

  export type UserCreateNestedOneWithoutInviteLinksSentInput = {
    create?: XOR<UserCreateWithoutInviteLinksSentInput, UserUncheckedCreateWithoutInviteLinksSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutInviteLinksSentInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutInviteLinksReceivedInput = {
    create?: XOR<UserCreateWithoutInviteLinksReceivedInput, UserUncheckedCreateWithoutInviteLinksReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutInviteLinksReceivedInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutInviteLinksSentNestedInput = {
    create?: XOR<UserCreateWithoutInviteLinksSentInput, UserUncheckedCreateWithoutInviteLinksSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutInviteLinksSentInput
    upsert?: UserUpsertWithoutInviteLinksSentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInviteLinksSentInput, UserUpdateWithoutInviteLinksSentInput>, UserUncheckedUpdateWithoutInviteLinksSentInput>
  }

  export type UserUpdateOneWithoutInviteLinksReceivedNestedInput = {
    create?: XOR<UserCreateWithoutInviteLinksReceivedInput, UserUncheckedCreateWithoutInviteLinksReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutInviteLinksReceivedInput
    upsert?: UserUpsertWithoutInviteLinksReceivedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInviteLinksReceivedInput, UserUpdateWithoutInviteLinksReceivedInput>, UserUncheckedUpdateWithoutInviteLinksReceivedInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AssessmentResultCreateNestedOneWithoutSessionInput = {
    create?: XOR<AssessmentResultCreateWithoutSessionInput, AssessmentResultUncheckedCreateWithoutSessionInput>
    connectOrCreate?: AssessmentResultCreateOrConnectWithoutSessionInput
    connect?: AssessmentResultWhereUniqueInput
  }

  export type AssessmentResultUncheckedCreateNestedOneWithoutSessionInput = {
    create?: XOR<AssessmentResultCreateWithoutSessionInput, AssessmentResultUncheckedCreateWithoutSessionInput>
    connectOrCreate?: AssessmentResultCreateOrConnectWithoutSessionInput
    connect?: AssessmentResultWhereUniqueInput
  }

  export type AssessmentResultUpdateOneWithoutSessionNestedInput = {
    create?: XOR<AssessmentResultCreateWithoutSessionInput, AssessmentResultUncheckedCreateWithoutSessionInput>
    connectOrCreate?: AssessmentResultCreateOrConnectWithoutSessionInput
    upsert?: AssessmentResultUpsertWithoutSessionInput
    disconnect?: AssessmentResultWhereInput | boolean
    delete?: AssessmentResultWhereInput | boolean
    connect?: AssessmentResultWhereUniqueInput
    update?: XOR<XOR<AssessmentResultUpdateToOneWithWhereWithoutSessionInput, AssessmentResultUpdateWithoutSessionInput>, AssessmentResultUncheckedUpdateWithoutSessionInput>
  }

  export type AssessmentResultUncheckedUpdateOneWithoutSessionNestedInput = {
    create?: XOR<AssessmentResultCreateWithoutSessionInput, AssessmentResultUncheckedCreateWithoutSessionInput>
    connectOrCreate?: AssessmentResultCreateOrConnectWithoutSessionInput
    upsert?: AssessmentResultUpsertWithoutSessionInput
    disconnect?: AssessmentResultWhereInput | boolean
    delete?: AssessmentResultWhereInput | boolean
    connect?: AssessmentResultWhereUniqueInput
    update?: XOR<XOR<AssessmentResultUpdateToOneWithWhereWithoutSessionInput, AssessmentResultUpdateWithoutSessionInput>, AssessmentResultUncheckedUpdateWithoutSessionInput>
  }

  export type AssessmentSessionCreateNestedOneWithoutResultInput = {
    create?: XOR<AssessmentSessionCreateWithoutResultInput, AssessmentSessionUncheckedCreateWithoutResultInput>
    connectOrCreate?: AssessmentSessionCreateOrConnectWithoutResultInput
    connect?: AssessmentSessionWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AssessmentSessionUpdateOneRequiredWithoutResultNestedInput = {
    create?: XOR<AssessmentSessionCreateWithoutResultInput, AssessmentSessionUncheckedCreateWithoutResultInput>
    connectOrCreate?: AssessmentSessionCreateOrConnectWithoutResultInput
    upsert?: AssessmentSessionUpsertWithoutResultInput
    connect?: AssessmentSessionWhereUniqueInput
    update?: XOR<XOR<AssessmentSessionUpdateToOneWithWhereWithoutResultInput, AssessmentSessionUpdateWithoutResultInput>, AssessmentSessionUncheckedUpdateWithoutResultInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type InviteLinkCreateWithoutInviterInput = {
    id?: string
    inviteCode: string
    status?: string
    expiresAt: Date | string
    completedAt?: Date | string | null
    friendEmail?: string | null
    friendNickname?: string | null
    relationshipType?: string | null
    openedAt?: Date | string | null
    startedAt?: Date | string | null
    abandonedAt?: Date | string | null
    deviceType?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    target?: UserCreateNestedOneWithoutInviteLinksReceivedInput
  }

  export type InviteLinkUncheckedCreateWithoutInviterInput = {
    id?: string
    inviteCode: string
    targetId?: string | null
    status?: string
    expiresAt: Date | string
    completedAt?: Date | string | null
    friendEmail?: string | null
    friendNickname?: string | null
    relationshipType?: string | null
    openedAt?: Date | string | null
    startedAt?: Date | string | null
    abandonedAt?: Date | string | null
    deviceType?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InviteLinkCreateOrConnectWithoutInviterInput = {
    where: InviteLinkWhereUniqueInput
    create: XOR<InviteLinkCreateWithoutInviterInput, InviteLinkUncheckedCreateWithoutInviterInput>
  }

  export type InviteLinkCreateManyInviterInputEnvelope = {
    data: InviteLinkCreateManyInviterInput | InviteLinkCreateManyInviterInput[]
    skipDuplicates?: boolean
  }

  export type InviteLinkCreateWithoutTargetInput = {
    id?: string
    inviteCode: string
    status?: string
    expiresAt: Date | string
    completedAt?: Date | string | null
    friendEmail?: string | null
    friendNickname?: string | null
    relationshipType?: string | null
    openedAt?: Date | string | null
    startedAt?: Date | string | null
    abandonedAt?: Date | string | null
    deviceType?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviter: UserCreateNestedOneWithoutInviteLinksSentInput
  }

  export type InviteLinkUncheckedCreateWithoutTargetInput = {
    id?: string
    inviteCode: string
    inviterId: string
    status?: string
    expiresAt: Date | string
    completedAt?: Date | string | null
    friendEmail?: string | null
    friendNickname?: string | null
    relationshipType?: string | null
    openedAt?: Date | string | null
    startedAt?: Date | string | null
    abandonedAt?: Date | string | null
    deviceType?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InviteLinkCreateOrConnectWithoutTargetInput = {
    where: InviteLinkWhereUniqueInput
    create: XOR<InviteLinkCreateWithoutTargetInput, InviteLinkUncheckedCreateWithoutTargetInput>
  }

  export type InviteLinkCreateManyTargetInputEnvelope = {
    data: InviteLinkCreateManyTargetInput | InviteLinkCreateManyTargetInput[]
    skipDuplicates?: boolean
  }

  export type ProfileCreateWithoutUserInput = {
    id?: string
    bio?: string | null
    avatarUrl?: string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ProfileUncheckedCreateWithoutUserInput = {
    id?: string
    bio?: string | null
    avatarUrl?: string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ProfileCreateOrConnectWithoutUserInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
  }

  export type ResponseCreateWithoutAboutUserInput = {
    id?: string
    answer: string
    notSure?: boolean
    responseTime?: number | null
    qualityScore?: number | null
    flaggedMalicious?: boolean
    createdAt?: Date | string
    answeredByUser: UserCreateNestedOneWithoutResponsesGivenInput
    question: QuestionCreateNestedOneWithoutResponsesInput
  }

  export type ResponseUncheckedCreateWithoutAboutUserInput = {
    id?: string
    questionId: string
    answeredById: string
    answer: string
    notSure?: boolean
    responseTime?: number | null
    qualityScore?: number | null
    flaggedMalicious?: boolean
    createdAt?: Date | string
  }

  export type ResponseCreateOrConnectWithoutAboutUserInput = {
    where: ResponseWhereUniqueInput
    create: XOR<ResponseCreateWithoutAboutUserInput, ResponseUncheckedCreateWithoutAboutUserInput>
  }

  export type ResponseCreateManyAboutUserInputEnvelope = {
    data: ResponseCreateManyAboutUserInput | ResponseCreateManyAboutUserInput[]
    skipDuplicates?: boolean
  }

  export type ResponseCreateWithoutAnsweredByUserInput = {
    id?: string
    answer: string
    notSure?: boolean
    responseTime?: number | null
    qualityScore?: number | null
    flaggedMalicious?: boolean
    createdAt?: Date | string
    aboutUser: UserCreateNestedOneWithoutResponsesAboutInput
    question: QuestionCreateNestedOneWithoutResponsesInput
  }

  export type ResponseUncheckedCreateWithoutAnsweredByUserInput = {
    id?: string
    questionId: string
    aboutUserId: string
    answer: string
    notSure?: boolean
    responseTime?: number | null
    qualityScore?: number | null
    flaggedMalicious?: boolean
    createdAt?: Date | string
  }

  export type ResponseCreateOrConnectWithoutAnsweredByUserInput = {
    where: ResponseWhereUniqueInput
    create: XOR<ResponseCreateWithoutAnsweredByUserInput, ResponseUncheckedCreateWithoutAnsweredByUserInput>
  }

  export type ResponseCreateManyAnsweredByUserInputEnvelope = {
    data: ResponseCreateManyAnsweredByUserInput | ResponseCreateManyAnsweredByUserInput[]
    skipDuplicates?: boolean
  }

  export type InviteLinkUpsertWithWhereUniqueWithoutInviterInput = {
    where: InviteLinkWhereUniqueInput
    update: XOR<InviteLinkUpdateWithoutInviterInput, InviteLinkUncheckedUpdateWithoutInviterInput>
    create: XOR<InviteLinkCreateWithoutInviterInput, InviteLinkUncheckedCreateWithoutInviterInput>
  }

  export type InviteLinkUpdateWithWhereUniqueWithoutInviterInput = {
    where: InviteLinkWhereUniqueInput
    data: XOR<InviteLinkUpdateWithoutInviterInput, InviteLinkUncheckedUpdateWithoutInviterInput>
  }

  export type InviteLinkUpdateManyWithWhereWithoutInviterInput = {
    where: InviteLinkScalarWhereInput
    data: XOR<InviteLinkUpdateManyMutationInput, InviteLinkUncheckedUpdateManyWithoutInviterInput>
  }

  export type InviteLinkScalarWhereInput = {
    AND?: InviteLinkScalarWhereInput | InviteLinkScalarWhereInput[]
    OR?: InviteLinkScalarWhereInput[]
    NOT?: InviteLinkScalarWhereInput | InviteLinkScalarWhereInput[]
    id?: StringFilter<"InviteLink"> | string
    inviteCode?: StringFilter<"InviteLink"> | string
    inviterId?: StringFilter<"InviteLink"> | string
    targetId?: StringNullableFilter<"InviteLink"> | string | null
    status?: StringFilter<"InviteLink"> | string
    expiresAt?: DateTimeFilter<"InviteLink"> | Date | string
    completedAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    friendEmail?: StringNullableFilter<"InviteLink"> | string | null
    friendNickname?: StringNullableFilter<"InviteLink"> | string | null
    relationshipType?: StringNullableFilter<"InviteLink"> | string | null
    openedAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    startedAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    abandonedAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    deviceType?: StringNullableFilter<"InviteLink"> | string | null
    ipAddress?: StringNullableFilter<"InviteLink"> | string | null
    userAgent?: StringNullableFilter<"InviteLink"> | string | null
    createdAt?: DateTimeFilter<"InviteLink"> | Date | string
    updatedAt?: DateTimeFilter<"InviteLink"> | Date | string
  }

  export type InviteLinkUpsertWithWhereUniqueWithoutTargetInput = {
    where: InviteLinkWhereUniqueInput
    update: XOR<InviteLinkUpdateWithoutTargetInput, InviteLinkUncheckedUpdateWithoutTargetInput>
    create: XOR<InviteLinkCreateWithoutTargetInput, InviteLinkUncheckedCreateWithoutTargetInput>
  }

  export type InviteLinkUpdateWithWhereUniqueWithoutTargetInput = {
    where: InviteLinkWhereUniqueInput
    data: XOR<InviteLinkUpdateWithoutTargetInput, InviteLinkUncheckedUpdateWithoutTargetInput>
  }

  export type InviteLinkUpdateManyWithWhereWithoutTargetInput = {
    where: InviteLinkScalarWhereInput
    data: XOR<InviteLinkUpdateManyMutationInput, InviteLinkUncheckedUpdateManyWithoutTargetInput>
  }

  export type ProfileUpsertWithoutUserInput = {
    update: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseUpsertWithWhereUniqueWithoutAboutUserInput = {
    where: ResponseWhereUniqueInput
    update: XOR<ResponseUpdateWithoutAboutUserInput, ResponseUncheckedUpdateWithoutAboutUserInput>
    create: XOR<ResponseCreateWithoutAboutUserInput, ResponseUncheckedCreateWithoutAboutUserInput>
  }

  export type ResponseUpdateWithWhereUniqueWithoutAboutUserInput = {
    where: ResponseWhereUniqueInput
    data: XOR<ResponseUpdateWithoutAboutUserInput, ResponseUncheckedUpdateWithoutAboutUserInput>
  }

  export type ResponseUpdateManyWithWhereWithoutAboutUserInput = {
    where: ResponseScalarWhereInput
    data: XOR<ResponseUpdateManyMutationInput, ResponseUncheckedUpdateManyWithoutAboutUserInput>
  }

  export type ResponseScalarWhereInput = {
    AND?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
    OR?: ResponseScalarWhereInput[]
    NOT?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
    id?: StringFilter<"Response"> | string
    questionId?: StringFilter<"Response"> | string
    answeredById?: StringFilter<"Response"> | string
    aboutUserId?: StringFilter<"Response"> | string
    answer?: StringFilter<"Response"> | string
    notSure?: BoolFilter<"Response"> | boolean
    responseTime?: IntNullableFilter<"Response"> | number | null
    qualityScore?: FloatNullableFilter<"Response"> | number | null
    flaggedMalicious?: BoolFilter<"Response"> | boolean
    createdAt?: DateTimeFilter<"Response"> | Date | string
  }

  export type ResponseUpsertWithWhereUniqueWithoutAnsweredByUserInput = {
    where: ResponseWhereUniqueInput
    update: XOR<ResponseUpdateWithoutAnsweredByUserInput, ResponseUncheckedUpdateWithoutAnsweredByUserInput>
    create: XOR<ResponseCreateWithoutAnsweredByUserInput, ResponseUncheckedCreateWithoutAnsweredByUserInput>
  }

  export type ResponseUpdateWithWhereUniqueWithoutAnsweredByUserInput = {
    where: ResponseWhereUniqueInput
    data: XOR<ResponseUpdateWithoutAnsweredByUserInput, ResponseUncheckedUpdateWithoutAnsweredByUserInput>
  }

  export type ResponseUpdateManyWithWhereWithoutAnsweredByUserInput = {
    where: ResponseScalarWhereInput
    data: XOR<ResponseUpdateManyMutationInput, ResponseUncheckedUpdateManyWithoutAnsweredByUserInput>
  }

  export type UserCreateWithoutProfileInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkId: string
    inviteLinksSent?: InviteLinkCreateNestedManyWithoutInviterInput
    inviteLinksReceived?: InviteLinkCreateNestedManyWithoutTargetInput
    responsesAbout?: ResponseCreateNestedManyWithoutAboutUserInput
    responsesGiven?: ResponseCreateNestedManyWithoutAnsweredByUserInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkId: string
    inviteLinksSent?: InviteLinkUncheckedCreateNestedManyWithoutInviterInput
    inviteLinksReceived?: InviteLinkUncheckedCreateNestedManyWithoutTargetInput
    responsesAbout?: ResponseUncheckedCreateNestedManyWithoutAboutUserInput
    responsesGiven?: ResponseUncheckedCreateNestedManyWithoutAnsweredByUserInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkId?: StringFieldUpdateOperationsInput | string
    inviteLinksSent?: InviteLinkUpdateManyWithoutInviterNestedInput
    inviteLinksReceived?: InviteLinkUpdateManyWithoutTargetNestedInput
    responsesAbout?: ResponseUpdateManyWithoutAboutUserNestedInput
    responsesGiven?: ResponseUpdateManyWithoutAnsweredByUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkId?: StringFieldUpdateOperationsInput | string
    inviteLinksSent?: InviteLinkUncheckedUpdateManyWithoutInviterNestedInput
    inviteLinksReceived?: InviteLinkUncheckedUpdateManyWithoutTargetNestedInput
    responsesAbout?: ResponseUncheckedUpdateManyWithoutAboutUserNestedInput
    responsesGiven?: ResponseUncheckedUpdateManyWithoutAnsweredByUserNestedInput
  }

  export type ResponseCreateWithoutQuestionInput = {
    id?: string
    answer: string
    notSure?: boolean
    responseTime?: number | null
    qualityScore?: number | null
    flaggedMalicious?: boolean
    createdAt?: Date | string
    aboutUser: UserCreateNestedOneWithoutResponsesAboutInput
    answeredByUser: UserCreateNestedOneWithoutResponsesGivenInput
  }

  export type ResponseUncheckedCreateWithoutQuestionInput = {
    id?: string
    answeredById: string
    aboutUserId: string
    answer: string
    notSure?: boolean
    responseTime?: number | null
    qualityScore?: number | null
    flaggedMalicious?: boolean
    createdAt?: Date | string
  }

  export type ResponseCreateOrConnectWithoutQuestionInput = {
    where: ResponseWhereUniqueInput
    create: XOR<ResponseCreateWithoutQuestionInput, ResponseUncheckedCreateWithoutQuestionInput>
  }

  export type ResponseCreateManyQuestionInputEnvelope = {
    data: ResponseCreateManyQuestionInput | ResponseCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type ResponseUpsertWithWhereUniqueWithoutQuestionInput = {
    where: ResponseWhereUniqueInput
    update: XOR<ResponseUpdateWithoutQuestionInput, ResponseUncheckedUpdateWithoutQuestionInput>
    create: XOR<ResponseCreateWithoutQuestionInput, ResponseUncheckedCreateWithoutQuestionInput>
  }

  export type ResponseUpdateWithWhereUniqueWithoutQuestionInput = {
    where: ResponseWhereUniqueInput
    data: XOR<ResponseUpdateWithoutQuestionInput, ResponseUncheckedUpdateWithoutQuestionInput>
  }

  export type ResponseUpdateManyWithWhereWithoutQuestionInput = {
    where: ResponseScalarWhereInput
    data: XOR<ResponseUpdateManyMutationInput, ResponseUncheckedUpdateManyWithoutQuestionInput>
  }

  export type UserCreateWithoutResponsesAboutInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkId: string
    inviteLinksSent?: InviteLinkCreateNestedManyWithoutInviterInput
    inviteLinksReceived?: InviteLinkCreateNestedManyWithoutTargetInput
    profile?: ProfileCreateNestedOneWithoutUserInput
    responsesGiven?: ResponseCreateNestedManyWithoutAnsweredByUserInput
  }

  export type UserUncheckedCreateWithoutResponsesAboutInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkId: string
    inviteLinksSent?: InviteLinkUncheckedCreateNestedManyWithoutInviterInput
    inviteLinksReceived?: InviteLinkUncheckedCreateNestedManyWithoutTargetInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    responsesGiven?: ResponseUncheckedCreateNestedManyWithoutAnsweredByUserInput
  }

  export type UserCreateOrConnectWithoutResponsesAboutInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResponsesAboutInput, UserUncheckedCreateWithoutResponsesAboutInput>
  }

  export type UserCreateWithoutResponsesGivenInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkId: string
    inviteLinksSent?: InviteLinkCreateNestedManyWithoutInviterInput
    inviteLinksReceived?: InviteLinkCreateNestedManyWithoutTargetInput
    profile?: ProfileCreateNestedOneWithoutUserInput
    responsesAbout?: ResponseCreateNestedManyWithoutAboutUserInput
  }

  export type UserUncheckedCreateWithoutResponsesGivenInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkId: string
    inviteLinksSent?: InviteLinkUncheckedCreateNestedManyWithoutInviterInput
    inviteLinksReceived?: InviteLinkUncheckedCreateNestedManyWithoutTargetInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    responsesAbout?: ResponseUncheckedCreateNestedManyWithoutAboutUserInput
  }

  export type UserCreateOrConnectWithoutResponsesGivenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResponsesGivenInput, UserUncheckedCreateWithoutResponsesGivenInput>
  }

  export type QuestionCreateWithoutResponsesInput = {
    id?: string
    text: string
    category?: string | null
    isThirdParty?: boolean
    createdAt?: Date | string
  }

  export type QuestionUncheckedCreateWithoutResponsesInput = {
    id?: string
    text: string
    category?: string | null
    isThirdParty?: boolean
    createdAt?: Date | string
  }

  export type QuestionCreateOrConnectWithoutResponsesInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutResponsesInput, QuestionUncheckedCreateWithoutResponsesInput>
  }

  export type UserUpsertWithoutResponsesAboutInput = {
    update: XOR<UserUpdateWithoutResponsesAboutInput, UserUncheckedUpdateWithoutResponsesAboutInput>
    create: XOR<UserCreateWithoutResponsesAboutInput, UserUncheckedCreateWithoutResponsesAboutInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResponsesAboutInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResponsesAboutInput, UserUncheckedUpdateWithoutResponsesAboutInput>
  }

  export type UserUpdateWithoutResponsesAboutInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkId?: StringFieldUpdateOperationsInput | string
    inviteLinksSent?: InviteLinkUpdateManyWithoutInviterNestedInput
    inviteLinksReceived?: InviteLinkUpdateManyWithoutTargetNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
    responsesGiven?: ResponseUpdateManyWithoutAnsweredByUserNestedInput
  }

  export type UserUncheckedUpdateWithoutResponsesAboutInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkId?: StringFieldUpdateOperationsInput | string
    inviteLinksSent?: InviteLinkUncheckedUpdateManyWithoutInviterNestedInput
    inviteLinksReceived?: InviteLinkUncheckedUpdateManyWithoutTargetNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    responsesGiven?: ResponseUncheckedUpdateManyWithoutAnsweredByUserNestedInput
  }

  export type UserUpsertWithoutResponsesGivenInput = {
    update: XOR<UserUpdateWithoutResponsesGivenInput, UserUncheckedUpdateWithoutResponsesGivenInput>
    create: XOR<UserCreateWithoutResponsesGivenInput, UserUncheckedCreateWithoutResponsesGivenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResponsesGivenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResponsesGivenInput, UserUncheckedUpdateWithoutResponsesGivenInput>
  }

  export type UserUpdateWithoutResponsesGivenInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkId?: StringFieldUpdateOperationsInput | string
    inviteLinksSent?: InviteLinkUpdateManyWithoutInviterNestedInput
    inviteLinksReceived?: InviteLinkUpdateManyWithoutTargetNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
    responsesAbout?: ResponseUpdateManyWithoutAboutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutResponsesGivenInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkId?: StringFieldUpdateOperationsInput | string
    inviteLinksSent?: InviteLinkUncheckedUpdateManyWithoutInviterNestedInput
    inviteLinksReceived?: InviteLinkUncheckedUpdateManyWithoutTargetNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    responsesAbout?: ResponseUncheckedUpdateManyWithoutAboutUserNestedInput
  }

  export type QuestionUpsertWithoutResponsesInput = {
    update: XOR<QuestionUpdateWithoutResponsesInput, QuestionUncheckedUpdateWithoutResponsesInput>
    create: XOR<QuestionCreateWithoutResponsesInput, QuestionUncheckedCreateWithoutResponsesInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateToOneWithWhereWithoutResponsesInput = {
    where?: QuestionWhereInput
    data: XOR<QuestionUpdateWithoutResponsesInput, QuestionUncheckedUpdateWithoutResponsesInput>
  }

  export type QuestionUpdateWithoutResponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isThirdParty?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionUncheckedUpdateWithoutResponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isThirdParty?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutInviteLinksSentInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkId: string
    inviteLinksReceived?: InviteLinkCreateNestedManyWithoutTargetInput
    profile?: ProfileCreateNestedOneWithoutUserInput
    responsesAbout?: ResponseCreateNestedManyWithoutAboutUserInput
    responsesGiven?: ResponseCreateNestedManyWithoutAnsweredByUserInput
  }

  export type UserUncheckedCreateWithoutInviteLinksSentInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkId: string
    inviteLinksReceived?: InviteLinkUncheckedCreateNestedManyWithoutTargetInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    responsesAbout?: ResponseUncheckedCreateNestedManyWithoutAboutUserInput
    responsesGiven?: ResponseUncheckedCreateNestedManyWithoutAnsweredByUserInput
  }

  export type UserCreateOrConnectWithoutInviteLinksSentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInviteLinksSentInput, UserUncheckedCreateWithoutInviteLinksSentInput>
  }

  export type UserCreateWithoutInviteLinksReceivedInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkId: string
    inviteLinksSent?: InviteLinkCreateNestedManyWithoutInviterInput
    profile?: ProfileCreateNestedOneWithoutUserInput
    responsesAbout?: ResponseCreateNestedManyWithoutAboutUserInput
    responsesGiven?: ResponseCreateNestedManyWithoutAnsweredByUserInput
  }

  export type UserUncheckedCreateWithoutInviteLinksReceivedInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkId: string
    inviteLinksSent?: InviteLinkUncheckedCreateNestedManyWithoutInviterInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    responsesAbout?: ResponseUncheckedCreateNestedManyWithoutAboutUserInput
    responsesGiven?: ResponseUncheckedCreateNestedManyWithoutAnsweredByUserInput
  }

  export type UserCreateOrConnectWithoutInviteLinksReceivedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInviteLinksReceivedInput, UserUncheckedCreateWithoutInviteLinksReceivedInput>
  }

  export type UserUpsertWithoutInviteLinksSentInput = {
    update: XOR<UserUpdateWithoutInviteLinksSentInput, UserUncheckedUpdateWithoutInviteLinksSentInput>
    create: XOR<UserCreateWithoutInviteLinksSentInput, UserUncheckedCreateWithoutInviteLinksSentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInviteLinksSentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInviteLinksSentInput, UserUncheckedUpdateWithoutInviteLinksSentInput>
  }

  export type UserUpdateWithoutInviteLinksSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkId?: StringFieldUpdateOperationsInput | string
    inviteLinksReceived?: InviteLinkUpdateManyWithoutTargetNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
    responsesAbout?: ResponseUpdateManyWithoutAboutUserNestedInput
    responsesGiven?: ResponseUpdateManyWithoutAnsweredByUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInviteLinksSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkId?: StringFieldUpdateOperationsInput | string
    inviteLinksReceived?: InviteLinkUncheckedUpdateManyWithoutTargetNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    responsesAbout?: ResponseUncheckedUpdateManyWithoutAboutUserNestedInput
    responsesGiven?: ResponseUncheckedUpdateManyWithoutAnsweredByUserNestedInput
  }

  export type UserUpsertWithoutInviteLinksReceivedInput = {
    update: XOR<UserUpdateWithoutInviteLinksReceivedInput, UserUncheckedUpdateWithoutInviteLinksReceivedInput>
    create: XOR<UserCreateWithoutInviteLinksReceivedInput, UserUncheckedCreateWithoutInviteLinksReceivedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInviteLinksReceivedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInviteLinksReceivedInput, UserUncheckedUpdateWithoutInviteLinksReceivedInput>
  }

  export type UserUpdateWithoutInviteLinksReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkId?: StringFieldUpdateOperationsInput | string
    inviteLinksSent?: InviteLinkUpdateManyWithoutInviterNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
    responsesAbout?: ResponseUpdateManyWithoutAboutUserNestedInput
    responsesGiven?: ResponseUpdateManyWithoutAnsweredByUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInviteLinksReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkId?: StringFieldUpdateOperationsInput | string
    inviteLinksSent?: InviteLinkUncheckedUpdateManyWithoutInviterNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    responsesAbout?: ResponseUncheckedUpdateManyWithoutAboutUserNestedInput
    responsesGiven?: ResponseUncheckedUpdateManyWithoutAnsweredByUserNestedInput
  }

  export type AssessmentResultCreateWithoutSessionInput = {
    id?: string
    userId?: string | null
    clerkUserId?: string | null
    isCurrent?: boolean
    scoreLumen: number
    scoreAether: number
    scoreOrpheus: number
    scoreOrin: number
    scoreLyra: number
    scoreVara: number
    scoreChronos: number
    scoreKael: number
    narrative: JsonNullValueInput | InputJsonValue
    archetype?: string | null
    profilePattern?: string | null
    consistencyScore?: number | null
    attentionScore?: number | null
    validationFlags?: NullableJsonNullValueInput | InputJsonValue
    generationCost?: number | null
    generationModel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentResultUncheckedCreateWithoutSessionInput = {
    id?: string
    userId?: string | null
    clerkUserId?: string | null
    isCurrent?: boolean
    scoreLumen: number
    scoreAether: number
    scoreOrpheus: number
    scoreOrin: number
    scoreLyra: number
    scoreVara: number
    scoreChronos: number
    scoreKael: number
    narrative: JsonNullValueInput | InputJsonValue
    archetype?: string | null
    profilePattern?: string | null
    consistencyScore?: number | null
    attentionScore?: number | null
    validationFlags?: NullableJsonNullValueInput | InputJsonValue
    generationCost?: number | null
    generationModel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentResultCreateOrConnectWithoutSessionInput = {
    where: AssessmentResultWhereUniqueInput
    create: XOR<AssessmentResultCreateWithoutSessionInput, AssessmentResultUncheckedCreateWithoutSessionInput>
  }

  export type AssessmentResultUpsertWithoutSessionInput = {
    update: XOR<AssessmentResultUpdateWithoutSessionInput, AssessmentResultUncheckedUpdateWithoutSessionInput>
    create: XOR<AssessmentResultCreateWithoutSessionInput, AssessmentResultUncheckedCreateWithoutSessionInput>
    where?: AssessmentResultWhereInput
  }

  export type AssessmentResultUpdateToOneWithWhereWithoutSessionInput = {
    where?: AssessmentResultWhereInput
    data: XOR<AssessmentResultUpdateWithoutSessionInput, AssessmentResultUncheckedUpdateWithoutSessionInput>
  }

  export type AssessmentResultUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    scoreLumen?: FloatFieldUpdateOperationsInput | number
    scoreAether?: FloatFieldUpdateOperationsInput | number
    scoreOrpheus?: FloatFieldUpdateOperationsInput | number
    scoreOrin?: FloatFieldUpdateOperationsInput | number
    scoreLyra?: FloatFieldUpdateOperationsInput | number
    scoreVara?: FloatFieldUpdateOperationsInput | number
    scoreChronos?: FloatFieldUpdateOperationsInput | number
    scoreKael?: FloatFieldUpdateOperationsInput | number
    narrative?: JsonNullValueInput | InputJsonValue
    archetype?: NullableStringFieldUpdateOperationsInput | string | null
    profilePattern?: NullableStringFieldUpdateOperationsInput | string | null
    consistencyScore?: NullableFloatFieldUpdateOperationsInput | number | null
    attentionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    validationFlags?: NullableJsonNullValueInput | InputJsonValue
    generationCost?: NullableFloatFieldUpdateOperationsInput | number | null
    generationModel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentResultUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    scoreLumen?: FloatFieldUpdateOperationsInput | number
    scoreAether?: FloatFieldUpdateOperationsInput | number
    scoreOrpheus?: FloatFieldUpdateOperationsInput | number
    scoreOrin?: FloatFieldUpdateOperationsInput | number
    scoreLyra?: FloatFieldUpdateOperationsInput | number
    scoreVara?: FloatFieldUpdateOperationsInput | number
    scoreChronos?: FloatFieldUpdateOperationsInput | number
    scoreKael?: FloatFieldUpdateOperationsInput | number
    narrative?: JsonNullValueInput | InputJsonValue
    archetype?: NullableStringFieldUpdateOperationsInput | string | null
    profilePattern?: NullableStringFieldUpdateOperationsInput | string | null
    consistencyScore?: NullableFloatFieldUpdateOperationsInput | number | null
    attentionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    validationFlags?: NullableJsonNullValueInput | InputJsonValue
    generationCost?: NullableFloatFieldUpdateOperationsInput | number | null
    generationModel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentSessionCreateWithoutResultInput = {
    id?: string
    userId?: string | null
    clerkUserId?: string | null
    status?: string
    isCurrent?: boolean
    responses: JsonNullValueInput | InputJsonValue
    demographics?: NullableJsonNullValueInput | InputJsonValue
    pendingQuestions?: NullableJsonNullValueInput | InputJsonValue
    answerHistory?: NullableJsonNullValueInput | InputJsonValue
    backNavigationCount?: number
    backNavigationLog?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    archivedAt?: Date | string | null
  }

  export type AssessmentSessionUncheckedCreateWithoutResultInput = {
    id?: string
    userId?: string | null
    clerkUserId?: string | null
    status?: string
    isCurrent?: boolean
    responses: JsonNullValueInput | InputJsonValue
    demographics?: NullableJsonNullValueInput | InputJsonValue
    pendingQuestions?: NullableJsonNullValueInput | InputJsonValue
    answerHistory?: NullableJsonNullValueInput | InputJsonValue
    backNavigationCount?: number
    backNavigationLog?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    archivedAt?: Date | string | null
  }

  export type AssessmentSessionCreateOrConnectWithoutResultInput = {
    where: AssessmentSessionWhereUniqueInput
    create: XOR<AssessmentSessionCreateWithoutResultInput, AssessmentSessionUncheckedCreateWithoutResultInput>
  }

  export type AssessmentSessionUpsertWithoutResultInput = {
    update: XOR<AssessmentSessionUpdateWithoutResultInput, AssessmentSessionUncheckedUpdateWithoutResultInput>
    create: XOR<AssessmentSessionCreateWithoutResultInput, AssessmentSessionUncheckedCreateWithoutResultInput>
    where?: AssessmentSessionWhereInput
  }

  export type AssessmentSessionUpdateToOneWithWhereWithoutResultInput = {
    where?: AssessmentSessionWhereInput
    data: XOR<AssessmentSessionUpdateWithoutResultInput, AssessmentSessionUncheckedUpdateWithoutResultInput>
  }

  export type AssessmentSessionUpdateWithoutResultInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    responses?: JsonNullValueInput | InputJsonValue
    demographics?: NullableJsonNullValueInput | InputJsonValue
    pendingQuestions?: NullableJsonNullValueInput | InputJsonValue
    answerHistory?: NullableJsonNullValueInput | InputJsonValue
    backNavigationCount?: IntFieldUpdateOperationsInput | number
    backNavigationLog?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AssessmentSessionUncheckedUpdateWithoutResultInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    responses?: JsonNullValueInput | InputJsonValue
    demographics?: NullableJsonNullValueInput | InputJsonValue
    pendingQuestions?: NullableJsonNullValueInput | InputJsonValue
    answerHistory?: NullableJsonNullValueInput | InputJsonValue
    backNavigationCount?: IntFieldUpdateOperationsInput | number
    backNavigationLog?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InviteLinkCreateManyInviterInput = {
    id?: string
    inviteCode: string
    targetId?: string | null
    status?: string
    expiresAt: Date | string
    completedAt?: Date | string | null
    friendEmail?: string | null
    friendNickname?: string | null
    relationshipType?: string | null
    openedAt?: Date | string | null
    startedAt?: Date | string | null
    abandonedAt?: Date | string | null
    deviceType?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InviteLinkCreateManyTargetInput = {
    id?: string
    inviteCode: string
    inviterId: string
    status?: string
    expiresAt: Date | string
    completedAt?: Date | string | null
    friendEmail?: string | null
    friendNickname?: string | null
    relationshipType?: string | null
    openedAt?: Date | string | null
    startedAt?: Date | string | null
    abandonedAt?: Date | string | null
    deviceType?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResponseCreateManyAboutUserInput = {
    id?: string
    questionId: string
    answeredById: string
    answer: string
    notSure?: boolean
    responseTime?: number | null
    qualityScore?: number | null
    flaggedMalicious?: boolean
    createdAt?: Date | string
  }

  export type ResponseCreateManyAnsweredByUserInput = {
    id?: string
    questionId: string
    aboutUserId: string
    answer: string
    notSure?: boolean
    responseTime?: number | null
    qualityScore?: number | null
    flaggedMalicious?: boolean
    createdAt?: Date | string
  }

  export type InviteLinkUpdateWithoutInviterInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    friendEmail?: NullableStringFieldUpdateOperationsInput | string | null
    friendNickname?: NullableStringFieldUpdateOperationsInput | string | null
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    openedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abandonedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: UserUpdateOneWithoutInviteLinksReceivedNestedInput
  }

  export type InviteLinkUncheckedUpdateWithoutInviterInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    friendEmail?: NullableStringFieldUpdateOperationsInput | string | null
    friendNickname?: NullableStringFieldUpdateOperationsInput | string | null
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    openedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abandonedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InviteLinkUncheckedUpdateManyWithoutInviterInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    friendEmail?: NullableStringFieldUpdateOperationsInput | string | null
    friendNickname?: NullableStringFieldUpdateOperationsInput | string | null
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    openedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abandonedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InviteLinkUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    friendEmail?: NullableStringFieldUpdateOperationsInput | string | null
    friendNickname?: NullableStringFieldUpdateOperationsInput | string | null
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    openedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abandonedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviter?: UserUpdateOneRequiredWithoutInviteLinksSentNestedInput
  }

  export type InviteLinkUncheckedUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    friendEmail?: NullableStringFieldUpdateOperationsInput | string | null
    friendNickname?: NullableStringFieldUpdateOperationsInput | string | null
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    openedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abandonedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InviteLinkUncheckedUpdateManyWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    friendEmail?: NullableStringFieldUpdateOperationsInput | string | null
    friendNickname?: NullableStringFieldUpdateOperationsInput | string | null
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    openedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abandonedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseUpdateWithoutAboutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    notSure?: BoolFieldUpdateOperationsInput | boolean
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    flaggedMalicious?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answeredByUser?: UserUpdateOneRequiredWithoutResponsesGivenNestedInput
    question?: QuestionUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type ResponseUncheckedUpdateWithoutAboutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answeredById?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    notSure?: BoolFieldUpdateOperationsInput | boolean
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    flaggedMalicious?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseUncheckedUpdateManyWithoutAboutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answeredById?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    notSure?: BoolFieldUpdateOperationsInput | boolean
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    flaggedMalicious?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseUpdateWithoutAnsweredByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    notSure?: BoolFieldUpdateOperationsInput | boolean
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    flaggedMalicious?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aboutUser?: UserUpdateOneRequiredWithoutResponsesAboutNestedInput
    question?: QuestionUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type ResponseUncheckedUpdateWithoutAnsweredByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    aboutUserId?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    notSure?: BoolFieldUpdateOperationsInput | boolean
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    flaggedMalicious?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseUncheckedUpdateManyWithoutAnsweredByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    aboutUserId?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    notSure?: BoolFieldUpdateOperationsInput | boolean
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    flaggedMalicious?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseCreateManyQuestionInput = {
    id?: string
    answeredById: string
    aboutUserId: string
    answer: string
    notSure?: boolean
    responseTime?: number | null
    qualityScore?: number | null
    flaggedMalicious?: boolean
    createdAt?: Date | string
  }

  export type ResponseUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    notSure?: BoolFieldUpdateOperationsInput | boolean
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    flaggedMalicious?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aboutUser?: UserUpdateOneRequiredWithoutResponsesAboutNestedInput
    answeredByUser?: UserUpdateOneRequiredWithoutResponsesGivenNestedInput
  }

  export type ResponseUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    answeredById?: StringFieldUpdateOperationsInput | string
    aboutUserId?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    notSure?: BoolFieldUpdateOperationsInput | boolean
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    flaggedMalicious?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseUncheckedUpdateManyWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    answeredById?: StringFieldUpdateOperationsInput | string
    aboutUserId?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    notSure?: BoolFieldUpdateOperationsInput | boolean
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    flaggedMalicious?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}