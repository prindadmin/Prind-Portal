
/*
This dispatcher fetches an object from the Procore API containing all the documents
on the specified project
*/

import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';

// TODO: Implement the /files/${companyId}/${projectId} endpoint

/*
async function GetProjectFilesAndFolders(payload) {

  // Get the current session and the identity jwtToken
  const identityToken = await Auth.currentSession()
    .then(credentials => {
      return credentials.idToken.jwtToken
    })

  // Fixed values for the API request
  const apiName = process.env.REACT_APP_API_NAME
  const myInit = {
    headers: { Authorization: identityToken },
    response: false,
  }

  const { companyId, projectId, folderId } = payload

  // Build path for request
  var path = `/files/${companyId}/${projectId}`
  if (folderId) {
    path = `${path}/${folderId}`
  }

  // Send the request
  return new Promise((resolve, reject) => {
    // Send the request
    API.get(apiName, path, myInit)
      .then(response => {
        if (response.Error) {
          reject(response)
          return;
        }
        resolve(response)
      })
      .catch(error => {
        //console.log(error.response);
        reject(error)
     })
   })
}
*/

function GetProjectFilesAndFolders(payload) {

  return {
    statusCode: 200,
    body: {
      folders: [
        {
          "id": 754204,
          "custom_fields": {},
          "name": "01 Design Files",
          "name_with_path": "Sandbox Test Project/01 Design Files",
          "parent_id": 754088,
          "updated_at": "2020-05-17T00:35:17Z",
          "is_deleted": false,
          "is_recycle_bin": false,
          "is_tracked": false,
          "tracked_folder": null,
          "has_children": true,
          "has_children_files": false,
          "has_children_folders": true,
          "folders": [],
          "files": [],
          "private": false,
          "read_only": false
        },
        {
          "id": 754258,
          "custom_fields": {},
          "name": "02 Bid Packages",
          "name_with_path": "Sandbox Test Project/02 Bid Packages",
          "parent_id": 754088,
          "updated_at": "2020-05-17T00:35:18Z",
          "is_deleted": false,
          "is_recycle_bin": false,
          "is_tracked": false,
          "tracked_folder": null,
          "has_children": false,
          "has_children_files": false,
          "has_children_folders": false,
          "folders": [],
          "files": [],
          "private": false,
          "read_only": false
        }
      ],
      files: [
        {
          "id": 12,
          "name": "file.pdf",
          "parent_id": 1,
          "size": 54332,
          "description": "this is a cool file",
          "updated_at": "2017-01-04T21:27:18Z",
          "created_at": "2017-01-04T21:27:18Z",
          "checked_out_until": "2017-01-04T21:27:18Z",
          "name_with_path": "Root Folder/file.pdf",
          "private": false,
          "is_tracked": false,
          "checked_out_by": {
            "id": 160586,
            "login": "exampleuser@website.com",
            "name": "Carl Contractor"
          },
          "file_type": "PDF",
          "file_versions": [
            {
              "file_id": 14,
              "id": 12,
              "notes": "this is a cool file version",
              "url": "www.file.com",
              "size": 12674,
              "created_at": "2017-01-03T21:27:18Z",
              "number": 3,
              "created_by": {
                "id": 160586,
                "login": "exampleuser@website.com",
                "name": "Carl Contractor"
              },
              "prostore_file": {
                "id": 42,
                "name": "foobar",
                "url": "foobar",
                "filename": "foobar"
              },
              "anchor": {
                "keyName": "keys-1",
                "signature": "H9fPcp6BokwC+krq+mxsNA+QY+ajSxnA5sa4AtlpVszp8hCWb6iSl1vEmIQHxpSddIcaDpqkIbDaOZPRA3zQABDvvvHF2KWtfej22DVTrLQXrrwSRT9UsHqd9kC+JaNlYk1b1rpXm7GQytncjNwr8kkg/dDxjYm6Ai77Hry5ntNBEb+it5bJcg6JjpcosF2PftzKzzyTCEZQD2/eCNLrcPei6odQfWM6wqU/dbwAWN3bO3IwIEDDZdZbin+JTbuZaZf+rOUYSCCijaNGPHoD8YXv2X0Nqevazah2Y4I6aZ4obrWi3qgPC09N+VzagErIGrER30cn31r272d9+U3Vrtnzor+aNEMkThpxpxsLbcgOHDk7N/KMu65fokCwxdq3pOMfHIk5PAo6FLZeUYhGQ4uW9UTEteln/ZW+Whokvo6eBfDnsGJQ/zJiI96VspNyCuwQYJneWLwz4D2nodj9UWww5RfEu+1uJ2PRvdoVvpUA0Bt0j0xdTTxtVotA98DjnXbeM3WeABKM5lSvYYwWnYmQNRxkfIyUenGrYFayYtgOeHbBBXyLaGf4TDLo0liA//2E0bDD5nFx6AobGdrl4aDf5o0a/bkADjDJCnFbuLE4kukqqpfmU6QdDP9QbpVzfNTozu3klOqQX9DevmZfiYUilYcb42FBUKlf8nExygE=",
                "signingAlgorithm": "rs256",
                "didVersion": 1.0,
                "did": "did:fctr:d85be1f5baa83fa83850d8b58731a7f7c8ba65c33dec107c2e16e0dd65c7bcc7",
                "entryHash": "b8102421677d1a407e36f76ceef172772dd3784611ae0170cb266f73ebf1d395"
              },
              "signatures": [
                {
                  "keyName": "keys-1",
                  "signature": "Atg8IwAyfoFTd/e7qq25gDovKzB0YJw4LDMlPeiRHMm7l3H8sJ96Rcc8jmhZb3GwTndTD/PluL2YMMtY+ZlePesZsUMiC0uQF0lgYMEwX5AgNmcATpZEEmKoOOJlQzMCY4oLi7GQNsoAsF7JaRttWmasHi4UltwRAb0v5Yh6j4lT/V2Wolj5u3o/CN3f5W36Sv+07BTe0djCSmFmVQr/ZRNc6rfzDjxrszqf44xs4lNPtoje1bctgK0rOaXZ1r1MGwKC5o3tlr0x1ZBNooD3zC97OD8/6baZM9hGMJ823VjrXsEDeVQ9+LJb/ul+rX6Bix65+UA7XN3rcZS0xAIShwxM5fxJ6UnDr7xwxVw3SKx5dI/P0b8EGqr2ByGk+SyXdWSnz3cyx3VdJpHWkRMJJW1kpVWqEPV//5aK43qNHJBxtOkyWp87ZuZvQivxJb3L/xFKHmR3rQ/ThV+JXpg5LopgFrr5mBkh7s1V1TGqB/GTYLBhFL3RbEWDBQy0kEpvy5f4UVcBx+kLH1/FPRRE3zXwJ7tOCMsvH2DNNjX5EaCL5780qovmOIwK0hprDpl8RerwHU+nQi/SQBL7r6vc9R/xN84ZuYsx8D6ov/sc7u6/HN3Tzc2WegFFpbPmd05rqYaQqiyN+6utw0HVXU+1yndCfUIWsM5vnVIB6Gb7U9A=",
                  "signingAlgorithm": "rs256",
                  "didVersion": 1.0,
                  "did": "did:fctr:d85be1f5baa83fa83850d8b58731a7f7c8ba65c33dec107c2e16e0dd65c7bcc7",
                  "entryHash": "ef0db7acc4ddfef09b0e0d992f980c81e3cecfce6ad426ea57e5850e88746cc9",
                  "signatureDate": "2017-01-06T11:27:18",
                  "signerName": "Terrence Smith",
                  "avatar": "https://foundations-portal-avatars.s3-eu-west-1.amazonaws.com/headshot-2.png"
                },
                {
                  "keyName": "keys-1",
                  "signature": "N2ew8Pag+DxpgwOj9TLpM30xsUa/D3ivsLg0GSgMkXhWAnrOEwyqKYlcCbr7kXFl0BBEVHTlvQGvZDEidYgdQKyU8Pxo6eX0RLWHzPxL2zv3l/yLRmo8gki2UXuN9Ec4H0+m/R0FKb0POiO4qNzft1Bsr4SHKadF5jD3JiSybAq03PtdPoWE4ZCAm8zk/986/gbXS0HtqwLUuoq0Pw6LOur1e53ohuspylWr9t3rA0/RRjY1IwHaDeyqqLhQ8rhrZwLt11TvExhVR0M3SL9KvR6baTMm2QoW2I8YQH8xv2AUqN4kfzkqFwQFuAHdCSI81b5b5wfYmUZLyI01G79NDSwwxRTZ53Egj8QerX8xG/7GSUFzBj/Vi9eaIO1yLseMWEAIuxs+UFaCjFauJ3768y7xmqmY/39jXV0o36cvufjvX80fFjZa+rHQyLkQv1qdSyvDtd/+HI5NUHMNcrcgY0bsjhLDDX1duZxSnvK/ArLI2/nvYXloibCNfqtbOjiVn8qaqb3zbqnR5pUZ9wotGD+OrVxlLMkbIBTvVXQmbqVYrMmOJKXj86+btUO9Vc0eJBF+bFg13OG9WgntCwJoQSNWYJ03FVewIba1UgLGNU8KMpu2/gWsdFyO7nS9iI6QVkZUX1vHO2UKsQ7ZLnRQ/fHENAOq8BkAU5R62azVWQY=",
                  "signingAlgorithm": "rs256",
                  "didVersion": 1.0,
                  "did": "did:fctr:d85be1f5baa83fa83850d8b58731a7f7c8ba65c33dec107c2e16e0dd65c7bcc8",
                  "entryHash": "ef0db7acc4ddfef09b0e0d992f980c81e3cecfce6ad426ea57e5850e88746cc9",
                  "signatureDate": "2017-01-07T12:27:18"
                },
                {
                  "keyName": "keys-1",
                  "signature": "N2ew8Pag+DxpgwOj9TLpM30xsUa/D3ivsLg0GSgMkXhWAnrOEwyqKYlcCbr7kXFl0BBEVHTlvQGvZDEidYgdQKyU8Pxo6eX0RLWHzPxL2zv3l/yLRmo8gki2UXuN9Ec4H0+m/R0FKb0POiO4qNzft1Bsr4SHKadF5jD3JiSybAq03PtdPoWE4ZCAm8zk/986/gbXS0HtqwLUuoq0Pw6LOur1e53ohuspylWr9t3rA0/RRjY1IwHaDeyqqLhQ8rhrZwLt11TvExhVR0M3SL9KvR6baTMm2QoW2I8YQH8xv2AUqN4kfzkqFwQFuAHdCSI81b5b5wfYmUZLyI01G79NDSwwxRTZ53Egj8QerX8xG/7GSUFzBj/Vi9eaIO1yLseMWEAIuxs+UFaCjFauJ3768y7xmqmY/39jXV0o36cvufjvX80fFjZa+rHQyLkQv1qdSyvDtd/+HI5NUHMNcrcgY0bsjhLDDX1duZxSnvK/ArLI2/nvYXloibCNfqtbOjiVn8qaqb3zbqnR5pUZ9wotGD+OrVxlLMkbIBTvVXQmbqVYrMmOJKXj86+btUO9Vc0eJBF+bFg13OG9WgntCwJoQSNWYJ03FVewIba1UgLGNU8KMpu2/gWsdFyO7nS9iI6QVkZUX1vHO2UKsQ7ZLnRQ/fHENAOq8BkAU5R62azVWQY=",
                  "signingAlgorithm": "rs256",
                  "didVersion": 1.0,
                  "did": "did:fctr:d85be1f5baa83fa83850d8b58731a7f7c8ba65c33dec107c2e16e0dd65c7bcc8",
                  "entryHash": "ef0db7acc4ddfef09b0e0d992f980c81e3cecfce6ad426ea57e5850e88746cc9",
                  "signatureDate": "2017-01-07T12:27:18"
                }
              ]
            },
            {
              "file_id": 15,
              "id": 12,
              "notes": "this is another cool file version with no signatures",
              "url": "www.file2.com",
              "size": 12677,
              "created_at": "2017-01-05T21:27:18Z",
              "number": 2,
              "created_by": {
                "id": 160586,
                "login": "exampleuser@website.com",
                "name": "Carl Contractor"
              },
              "prostore_file": {
                "id": 43,
                "name": "foobar",
                "url": "foobar",
                "filename": "foobar"
              },
              "anchor": {
                "keyName": "keys-1",
                "signature": "H9fPcp6BokwC+krq+mxsNA+QY+ajSxnA5sa4AtlpVszp8hCWb6iSl1vEmIQHxpSddIcaDpqkIbDaOZPRA3zQABDvvvHF2KWtfej22DVTrLQXrrwSRT9UsHqd9kC+JaNlYk1b1rpXm7GQytncjNwr8kkg/dDxjYm6Ai77Hry5ntNBEb+it5bJcg6JjpcosF2PftzKzzyTCEZQD2/eCNLrcPei6odQfWM6wqU/dbwAWN3bO3IwIEDDZdZbin+JTbuZaZf+rOUYSCCijaNGPHoD8YXv2X0Nqevazah2Y4I6aZ4obrWi3qgPC09N+VzagErIGrER30cn31r272d9+U3Vrtnzor+aNEMkThpxpxsLbcgOHDk7N/KMu65fokCwxdq3pOMfHIk5PAo6FLZeUYhGQ4uW9UTEteln/ZW+Whokvo6eBfDnsGJQ/zJiI96VspNyCuwQYJneWLwz4D2nodj9UWww5RfEu+1uJ2PRvdoVvpUA0Bt0j0xdTTxtVotA98DjnXbeM3WeABKM5lSvYYwWnYmQNRxkfIyUenGrYFayYtgOeHbBBXyLaGf4TDLo0liA//2E0bDD5nFx6AobGdrl4aDf5o0a/bkADjDJCnFbuLE4kukqqpfmU6QdDP9QbpVzfNTozu3klOqQX9DevmZfiYUilYcb42FBUKlf8nExygE=",
                "signingAlgorithm": "rs256",
                "didVersion": 1.0,
                "did": "did:fctr:d85be1f5baa83fa83850d8b58731a7f7c8ba65c33dec107c2e16e0dd65c7bcc7",
                "entryHash": "b8102421677d1a407e36f76ceef172772dd3784611ae0170cb266f73ebf1d395"
              },
              "signatures": []
            },
            {
              "file_id": 16,
              "id": 12,
              "notes": "this is another cool file version with no anchor",
              "url": "www.file3.com",
              "size": 12678,
              "created_at": "2017-01-04T21:27:18Z",
              "number": 1,
              "created_by": {
                "id": 160586,
                "login": "exampleuser@website.com",
                "name": "Carl Contractor"
              },
              "prostore_file": {
                "id": 44,
                "name": "foobar",
                "url": "foobar",
                "filename": "foobar"
              },
              "anchor": {},
              "signatures": []
            }
          ],
          "legacy_id": 12,
          "is_deleted": false,
          "custom_fields": {
            "custom_field_%{custom_field_string_definition_id}": {
              "data_type": "string",
              "value": "custom field value"
            },
            "custom_field_%{custom_field_decimal_definition_id}": {
              "data_type": "decimal",
              "value": 2.2
            },
            "custom_field_%{custom_field_boolean_definition_id}": {
              "data_type": "boolean",
              "value": true
            },
            "custom_field_%{custom_field_lov_entry_definition_id}": {
              "data_type": "lov_entry",
              "value": {
                "id": 1,
                "label": "Open"
              }
            },
            "custom_field_%{custom_field_lov_entries_definition_id}": {
              "data_type": "lov_entries",
              "value": [
                {
                  "id": 2,
                  "label": "Open"
                }
              ]
            }
          }
        },
        {
          "id": 13,
          "name": "file2.pdf",
          "parent_id": 1,
          "size": 54332,
          "description": "this is a boring file",
          "updated_at": "2017-01-04T21:27:18Z",
          "created_at": "2017-01-04T21:27:18Z",
          "checked_out_until": "2017-01-04T21:27:18Z",
          "name_with_path": "Root Folder/file.pdf",
          "private": false,
          "is_tracked": false,
          "checked_out_by": {
            "id": 160586,
            "login": "exampleuser@website.com",
            "name": "Carl Contractor"
          },
          "file_type": "PDF",
          "file_versions": [
            {
              "file_id": 16,
              "id": 13,
              "notes": "this is another boring file version with no anchor",
              "url": "www.file3.com",
              "size": 12678,
              "created_at": "2017-02-04T21:27:18Z",
              "number": 1,
              "created_by": {
                "id": 160586,
                "login": "exampleuser@website.com",
                "name": "Carl Contractor"
              },
              "prostore_file": {
                "id": 44,
                "name": "foobar",
                "url": "foobar",
                "filename": "foobar"
              },
              "anchor": {},
              "signatures": []
            }
          ],
          "legacy_id": 13,
          "is_deleted": false,
          "custom_fields": {
            "custom_field_%{custom_field_string_definition_id}": {
              "data_type": "string",
              "value": "custom field value"
            },
            "custom_field_%{custom_field_decimal_definition_id}": {
              "data_type": "decimal",
              "value": 2.2
            },
            "custom_field_%{custom_field_boolean_definition_id}": {
              "data_type": "boolean",
              "value": true
            },
            "custom_field_%{custom_field_lov_entry_definition_id}": {
              "data_type": "lov_entry",
              "value": {
                "id": 1,
                "label": "Open"
              }
            },
            "custom_field_%{custom_field_lov_entries_definition_id}": {
              "data_type": "lov_entries",
              "value": [
                {
                  "id": 2,
                  "label": "Open"
                }
              ]
            }
          }
        }
      ]
    }
  }
}

export default GetProjectFilesAndFolders
