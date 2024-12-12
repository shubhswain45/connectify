/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddSongToPlaylistInput = {
  coverImageUrl?: InputMaybe<Scalars['String']['input']>;
  existingPlaylistId?: InputMaybe<Scalars['String']['input']>;
  isNewPlaylist: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  trackIds: Array<Scalars['String']['input']>;
  visibility?: InputMaybe<Visibility>;
};

export type CreatePlaylistInput = {
  coverImageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
  trackIds: Array<Scalars['String']['input']>;
  visibility: Visibility;
};

export type LoginUserInput = {
  password: Scalars['String']['input'];
  usernameOrEmail: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addSongToPlaylist: Scalars['Boolean']['output'];
  createPlaylist: Scalars['Boolean']['output'];
  createTrack?: Maybe<Track>;
  deleteTrack: Scalars['Boolean']['output'];
  followUser: Scalars['Boolean']['output'];
  forgotPassword: Scalars['Boolean']['output'];
  likeTrack: Scalars['Boolean']['output'];
  loginUser: SignupUserResponse;
  logoutUser: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  signupUser: SignupUserResponse;
  verifyEmail?: Maybe<User>;
};


export type MutationAddSongToPlaylistArgs = {
  payload: AddSongToPlaylistInput;
};


export type MutationCreatePlaylistArgs = {
  payload: CreatePlaylistInput;
};


export type MutationCreateTrackArgs = {
  payload: CreateTrackPayload;
};


export type MutationDeleteTrackArgs = {
  trackId: Scalars['String']['input'];
};


export type MutationFollowUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  usernameOrEmail: Scalars['String']['input'];
};


export type MutationLikeTrackArgs = {
  trackId: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSignupUserArgs = {
  input: SignupUserInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type Playlist = {
  __typename?: 'Playlist';
  author: User;
  coverImageUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tracks: Array<Track>;
  visibility: Visibility;
};

export type Query = {
  __typename?: 'Query';
  getCurrentUser?: Maybe<User>;
  getFeedTracks?: Maybe<Array<Maybe<Track>>>;
  getPlaylistSongs: GetPlaylistSongsResponse;
  getTrackById?: Maybe<Track>;
  getUserPlaylists: UserPlaylistsResponse;
  getUserProfile?: Maybe<GetUserProfileResponse>;
  getUserTracks?: Maybe<Array<Maybe<Track>>>;
};


export type QueryGetPlaylistSongsArgs = {
  playlistId: Scalars['String']['input'];
};


export type QueryGetTrackByIdArgs = {
  trackId: Scalars['String']['input'];
};


export type QueryGetUserPlaylistsArgs = {
  username: Scalars['String']['input'];
};


export type QueryGetUserProfileArgs = {
  username: Scalars['String']['input'];
};


export type QueryGetUserTracksArgs = {
  username: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  confirmPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type SignupUserInput = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Track = {
  __typename?: 'Track';
  artist: Scalars['String']['output'];
  audioFileUrl: Scalars['String']['output'];
  author?: Maybe<User>;
  coverImageUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  duration: Scalars['String']['output'];
  hasLiked: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isVerified: Scalars['Boolean']['output'];
  profileImageURL?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type UserPlaylistsResponse = {
  __typename?: 'UserPlaylistsResponse';
  playlists?: Maybe<Array<UserPlaylistsResponseItem>>;
};

export type UserPlaylistsResponseItem = {
  __typename?: 'UserPlaylistsResponseItem';
  author: User;
  coverImageUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type VerifyEmailInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export enum Visibility {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type CreateTrackPayload = {
  artist?: InputMaybe<Scalars['String']['input']>;
  audioFileUrl: Scalars['String']['input'];
  coverImageUrl?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type GetPlaylistSongsResponse = {
  __typename?: 'getPlaylistSongsResponse';
  coverImageUrl: Scalars['String']['output'];
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  tracks?: Maybe<Array<Maybe<Track>>>;
};

export type GetUserProfileResponse = {
  __typename?: 'getUserProfileResponse';
  bio?: Maybe<Scalars['String']['output']>;
  followedByMe: Scalars['Boolean']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  profileImageURL?: Maybe<Scalars['String']['output']>;
  totalFollowers: Scalars['Int']['output'];
  totalFollowings: Scalars['Int']['output'];
  totalTracks: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type SignupUserResponse = {
  __typename?: 'signupUserResponse';
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isVerified: Scalars['Boolean']['output'];
  profileImageURL?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type SignupUserMutationVariables = Exact<{
  input: SignupUserInput;
}>;


export type SignupUserMutation = { __typename?: 'Mutation', signupUser: { __typename?: 'signupUserResponse', email: string, token: string } };

export type VerifyEmailMutationVariables = Exact<{
  input: VerifyEmailInput;
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail?: { __typename?: 'User', id: string, profileImageURL?: string | null, email: string, username: string, fullName: string, isVerified: boolean } | null };

export type LoginUserMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'signupUserResponse', id: string, profileImageURL?: string | null, email: string, username: string, fullName: string, isVerified: boolean, token: string } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  usernameOrEmail: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type AddSongToPlaylistMutationVariables = Exact<{
  payload: AddSongToPlaylistInput;
}>;


export type AddSongToPlaylistMutation = { __typename?: 'Mutation', addSongToPlaylist: boolean };

export type CreateTrackMutationVariables = Exact<{
  payload: CreateTrackPayload;
}>;


export type CreateTrackMutation = { __typename?: 'Mutation', createTrack?: { __typename?: 'Track', id: string, title: string, artist: string, duration: string, coverImageUrl?: string | null, audioFileUrl: string, author?: { __typename?: 'User', id: string, username: string, profileImageURL?: string | null } | null } | null };

export type LikeTrackMutationVariables = Exact<{
  trackId: Scalars['String']['input'];
}>;


export type LikeTrackMutation = { __typename?: 'Mutation', likeTrack: boolean };

export type FollowUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: boolean };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: string, profileImageURL?: string | null, email: string, username: string, fullName: string, isVerified: boolean } | null };

export type GetUserPlaylistsQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetUserPlaylistsQuery = { __typename?: 'Query', getUserPlaylists: { __typename?: 'UserPlaylistsResponse', playlists?: Array<{ __typename?: 'UserPlaylistsResponseItem', id: string, name: string, coverImageUrl: string }> | null } };

export type GetPlaylistSongsQueryVariables = Exact<{
  playlistId: Scalars['String']['input'];
}>;


export type GetPlaylistSongsQuery = { __typename?: 'Query', getPlaylistSongs: { __typename?: 'getPlaylistSongsResponse', id: string, title: string, coverImageUrl: string, tracks?: Array<{ __typename?: 'Track', id: string, title: string, artist: string, duration: string, audioFileUrl: string, coverImageUrl?: string | null, hasLiked: boolean } | null> | null } };

export type GetFeedTracksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeedTracksQuery = { __typename?: 'Query', getFeedTracks?: Array<{ __typename?: 'Track', id: string, title: string, artist: string, duration: string, audioFileUrl: string, coverImageUrl?: string | null } | null> | null };

export type GetTrackByIdQueryVariables = Exact<{
  trackId: Scalars['String']['input'];
}>;


export type GetTrackByIdQuery = { __typename?: 'Query', getTrackById?: { __typename?: 'Track', id: string, title: string, artist: string, duration: string, audioFileUrl: string, coverImageUrl?: string | null, hasLiked: boolean } | null };

export type GetUserProfileQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetUserProfileQuery = { __typename?: 'Query', getUserProfile?: { __typename?: 'getUserProfileResponse', id: string, username: string, fullName: string, profileImageURL?: string | null, bio?: string | null, totalTracks: number, totalFollowers: number, totalFollowings: number, followedByMe: boolean } | null };

export type GetUserTracksQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetUserTracksQuery = { __typename?: 'Query', getUserTracks?: Array<{ __typename?: 'Track', id: string, title: string, artist: string, coverImageUrl?: string | null, audioFileUrl: string, createdAt: string, updatedAt: string, hasLiked: boolean } | null> | null };


export const SignupUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignupUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<SignupUserMutation, SignupUserMutationVariables>;
export const VerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}}]} as unknown as DocumentNode<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logoutUser"}}]}}]} as unknown as DocumentNode<LogoutUserMutation, LogoutUserMutationVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usernameOrEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"usernameOrEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usernameOrEmail"}}}]}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const AddSongToPlaylistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSongToPlaylist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddSongToPlaylistInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSongToPlaylist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}]}]}}]} as unknown as DocumentNode<AddSongToPlaylistMutation, AddSongToPlaylistMutationVariables>;
export const CreateTrackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTrack"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"createTrackPayload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTrack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"coverImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"audioFileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]} as unknown as DocumentNode<CreateTrackMutation, CreateTrackMutationVariables>;
export const LikeTrackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeTrack"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trackId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeTrack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"trackId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trackId"}}}]}]}}]} as unknown as DocumentNode<LikeTrackMutation, LikeTrackMutationVariables>;
export const FollowUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FollowUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<FollowUserMutation, FollowUserMutationVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetUserPlaylistsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserPlaylists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserPlaylists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"coverImageUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserPlaylistsQuery, GetUserPlaylistsQueryVariables>;
export const GetPlaylistSongsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlaylistSongs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playlistId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPlaylistSongs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"playlistId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playlistId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"coverImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"tracks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"audioFileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"coverImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"hasLiked"}}]}}]}}]}}]} as unknown as DocumentNode<GetPlaylistSongsQuery, GetPlaylistSongsQueryVariables>;
export const GetFeedTracksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFeedTracks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFeedTracks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"audioFileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"coverImageUrl"}}]}}]}}]} as unknown as DocumentNode<GetFeedTracksQuery, GetFeedTracksQueryVariables>;
export const GetTrackByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTrackById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trackId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTrackById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"trackId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trackId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"audioFileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"coverImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"hasLiked"}}]}}]}}]} as unknown as DocumentNode<GetTrackByIdQuery, GetTrackByIdQueryVariables>;
export const GetUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"totalTracks"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowers"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowings"}},{"kind":"Field","name":{"kind":"Name","value":"followedByMe"}}]}}]}}]} as unknown as DocumentNode<GetUserProfileQuery, GetUserProfileQueryVariables>;
export const GetUserTracksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserTracks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserTracks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"coverImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"audioFileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"hasLiked"}}]}}]}}]} as unknown as DocumentNode<GetUserTracksQuery, GetUserTracksQueryVariables>;