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
  loginUser?: Maybe<User>;
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
  emailOrUsername: Scalars['String']['input'];
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
  getTrackById?: Maybe<Track>;
  getUserPlaylists: UserPlaylistsResponse;
  getUserProfile?: Maybe<GetUserProfileResponse>;
  getUserTracks?: Maybe<Array<Maybe<Track>>>;
};


export type QueryGetTrackByIdArgs = {
  trackId: Scalars['String']['input'];
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


export const SignupUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignupUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<SignupUserMutation, SignupUserMutationVariables>;