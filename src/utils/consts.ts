import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Search($search: String!, $after: String) {
    search(type: REPOSITORY, query: $search, first: 100, after: $after) {
      repos: edges {
        cursor
        repo: node {
          ... on Repository {
            url
            name
            description
            updatedAt
            stargazerCount
            owner {
              login
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      description
      url
      updatedAt
      stargazerCount
      owner {
        login
        avatarUrl
        url
      }
      languages(first: 10) {
        languages: edges {
          language: node {
            name
          }
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query {
    viewer {
      login
    }
  }
`;
