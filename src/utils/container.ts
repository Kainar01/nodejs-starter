import { container, DependencyContainer } from "tsyringe";
import { ConfigWrapper } from "../config/constraint";
import { Client } from "minio";

export const getContainer = () => container.createChildContainer();

export const makeMinio = async (container: DependencyContainer) => {
  // TODO: add retry
  const { config } = container.resolve(ConfigWrapper);

  const { bucket, connection } = config.getTyped("minio");
  const client = new Client(connection);

  if (await client.bucketExists(bucket)) {
    return client
  }
  
  await client.makeBucket(bucket, "");
  await client.setBucketPolicy(
    bucket,
    JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Action: ["s3:GetObject"],
          Effect: "Allow",
          Principal: "*",
          Resource: [`arn:aws:s3:::${bucket}/*`],
          Sid: "",
        },
      ],
    })
  );

  console.log({ bucket }, `${bucket} bucket created`);

  return client;
};
