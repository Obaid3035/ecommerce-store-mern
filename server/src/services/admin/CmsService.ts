import {Service} from "typedi";
import Home from "../../model/home";
import NotFound from "../../utils/errorCode";
import {IUploadMultipleAbout, IUploadMultipleContact, IUploadMultipleHome} from "../../interface";
import cloudinary from "../../utils/cloudinary";
import About from "../../model/about";
import Footer from "../../model/footer";
import Contact from "../../model/contact";
import Policy from "../../model/policy";
import Term from "../../model/term";
import Faq from "../../model/faq";

@Service()
class CmsService {

    async showFaq() {
        const faq = await Faq.findOne()
        if (!faq) {
            throw new NotFound("No Faq Found!")
        }
        return faq;
    }

    async showPolicy() {
        const policy = await Policy.findOne()
        if (!policy) {
            throw new NotFound("No Policy Found!")
        }
        return policy;
    }

    async showContact() {
        const contact = await Contact.findOne()
        if (!contact) {
            throw new NotFound("No Contact Found!")
        }
        return contact;
    }

    async showFooter() {
        const footer = await Footer.findOne()
        if (!footer) {
            throw new NotFound("No Footer Found!")
        }
        return footer;
    }

    async showHome() {
        const home = await Home.findOne();
        if (!home) {
            throw new NotFound("No Home Page Found!")
        }
        return home;
    }

    async showTerm() {
        const term = await Term.findOne();
        if (!term) {
            throw new NotFound("No Term Page Found!")
        }
        return term;
    }



    async updateContact(userInput: any, files: any) {
        const contact = await Contact.findOne();

        if (!contact) {

            const { section_1_image, section_2_image } =
                files as unknown as IUploadMultipleContact;


            if ( section_1_image && section_1_image.length > 0 &&
                section_2_image && section_2_image.length > 0) {

                const uploadImage1Promise = cloudinary.v2.uploader.upload(
                    section_1_image[0].path
                );

                const uploadImage2Promise = cloudinary.v2.uploader.upload(
                    section_2_image[0].path
                );
                const [uploadImage1, uploadImage2] =
                    await Promise.all([uploadImage1Promise, uploadImage2Promise])

                await Contact.create({
                    section_1: {
                        image: {
                            avatar: uploadImage1.secure_url,
                            cloudinary_id: uploadImage2.public_id
                        },
                        text: userInput.section_1_text
                    },
                    section_2: {
                        image: {
                            avatar: uploadImage2.secure_url,
                            cloudinary_id: uploadImage2.public_id
                        },
                        text: userInput.section_2_text
                    },
                    email: userInput.email,
                    address: userInput.address,
                    phoneNumber: userInput.phoneNumber
                });

                return {
                    message: "Footer created successfully!"
                };
            }
            throw new Error("Something went wrong")
        }

        const formData: any = {
            section_1: {
                image: {
                    avatar: contact.section_1.image.avatar,
                    cloudinary_id: contact.section_1.image.cloudinary_id
                },
                text: userInput.section_1_text
            },
            section_2: {
                image: {
                    avatar: contact.section_2.image.avatar,
                    cloudinary_id: contact.section_2.image.cloudinary_id
                },
                text: userInput.section_2_text
            },
            email: userInput.email,
            address: userInput.address,
            phoneNumber: userInput.phoneNumber
        }

        if (files.section_1_image && files.section_1_image[0].path) {
            await cloudinary.v2.uploader.destroy(
                contact.section_1.image.cloudinary_id
            );
            const uploadImage1 = await cloudinary.v2.uploader.upload(
                files.section_1_image[0].path
            );
            formData.section_1 = {
                image: {
                    avatar: uploadImage1.secure_url,
                    cloudinary_id: uploadImage1.public_id
                },
                text:  userInput.section_1_text
            }
        }

        if (files.section_2_image && files.section_2_image[0].path) {
            await cloudinary.v2.uploader.destroy(
                contact.section_2.image.cloudinary_id
            );
            const uploadImage2 = await cloudinary.v2.uploader.upload(
                files.section_2_image[0].path
            );
            formData.section_2 = {
                image: {
                    avatar: uploadImage2.secure_url,
                    cloudinary_id: uploadImage2.public_id
                },
                text:  userInput.section_2_text
            }
        }

        await Contact.findByIdAndUpdate(contact._id, formData);
        return {
            message: "Contact Page updated successfully!"
        };


    }

    async updateHome(userInput: any, files: any) {
        const home = await Home.findOne();
        if (!home) {
            throw new NotFound("No Home Page Found!")
        }


        const formData: any = {
            section_1: {
                slider_1: {
                    image: {
                        avatar: home.section_1.slider_1.image.avatar,
                        cloudinary_id: home.section_1.slider_1.image.cloudinary_id
                    },
                    text: userInput.section_1_1_text
                },
                slider_2: {
                    image: {
                        avatar: home.section_1.slider_2.image.avatar,
                        cloudinary_id: home.section_1.slider_1.image.cloudinary_id
                    },
                    text: userInput.section_1_2_text
                },
                slider_3: {
                    image: {
                        avatar: home.section_1.slider_2.image.avatar,
                        cloudinary_id: home.section_1.slider_1.image.cloudinary_id
                    },
                    text: userInput.section_1_3_text
                }
            },
            section_2: {
                image: {
                    avatar: home.section_2.image.avatar,
                    cloudinary_id: home.section_2.image.cloudinary_id
                },
            },
            section_3: {
                image: {
                    avatar: home.section_3.image.avatar,
                    cloudinary_id: home.section_3.image.cloudinary_id
                },
                text:  userInput.section_3_text
            },
            section_4: {
                image: {
                    avatar: home.section_4.image.avatar,
                    cloudinary_id: home.section_4.image.cloudinary_id
                },
                text:  userInput.section_4_text
            },
            section_5: {
                image: {
                    avatar: home.section_5.image.avatar,
                    cloudinary_id: home.section_5.image.cloudinary_id
                },
                text:  userInput.section_5_text
            },

            section_6: {
                image: {
                    avatar: home.section_6.image.avatar,
                    cloudinary_id: home.section_6.image.cloudinary_id
                },
                text:  userInput.section_6_text
            },

            section_7: {
                title:  userInput.section_7_title,
                box_1_image:  {
                    avatar: home.section_7.box_1_image.avatar,
                    cloudinary_id: home.section_7.box_1_image.cloudinary_id
                },
                box_2_image:  {
                    avatar: home.section_7.box_2_image.avatar,
                    cloudinary_id: home.section_7.box_2_image.cloudinary_id
                },
                box_3_image:  {
                    avatar: home.section_7.box_3_image.avatar,
                    cloudinary_id: home.section_7.box_3_image.cloudinary_id
                },
            },

        }

        if (files.section_1_image_1 && files.section_1_image_1[0].path) {
            await cloudinary.v2.uploader.destroy(
                home.section_1.slider_1.image.cloudinary_id
            );
            const uploadImage2 = await cloudinary.v2.uploader.upload(
                files.section_1_image_1[0].path
            );
            formData.section_1 = {
                ...formData.section_1,
                slider_1: {
                    image: {
                        avatar: uploadImage2.secure_url,
                        cloudinary_id: uploadImage2.public_id
                    },
                    text: userInput.section_1_1_text
                }
            }
        }

        if (files.section_1_image_2 && files.section_1_image_2[0].path) {
            await cloudinary.v2.uploader.destroy(
                home.section_1.slider_2.image.cloudinary_id
            );
            const uploadImage2 = await cloudinary.v2.uploader.upload(
                files.section_1_image_2[0].path
            );
            formData.section_1 = {
                ...formData.section_1,
                slider_2: {
                    image: {
                        avatar: uploadImage2.secure_url,
                        cloudinary_id: uploadImage2.public_id
                    },
                    text: userInput.section_1_2_text
                }
            }
        }

        if (files.section_1_image_3 && files.section_1_image_3[0].path) {
            await cloudinary.v2.uploader.destroy(
                home.section_1.slider_3.image.cloudinary_id
            );
            const uploadImage2 = await cloudinary.v2.uploader.upload(
                files.section_1_image_3[0].path
            );
            formData.section_1 = {
                ...formData.section_1,
                slider_3: {
                    image: {
                        avatar: uploadImage2.secure_url,
                        cloudinary_id: uploadImage2.public_id
                    },
                    text: userInput.section_1_3_text
                }
            }
        }

        if (files.section_2_image && files.section_2_image[0].path) {
           await cloudinary.v2.uploader.destroy(
                home.section_2.image.cloudinary_id
            );
            const uploadImage2 = await cloudinary.v2.uploader.upload(
                files.section_2_image[0].path
            );
            formData.section_2 = {
                image: {
                    avatar: uploadImage2.secure_url,
                    cloudinary_id: uploadImage2.public_id
                }
            }
        }

        if (files.section_3_image && files.section_3_image[0].path) {
            await cloudinary.v2.uploader.destroy(
                home.section_3.image.cloudinary_id
            );
            const uploadImage3 = await cloudinary.v2.uploader.upload(
                files.section_3_image[0].path
            );
            formData.section_3 = {
                image: {
                    avatar: uploadImage3.secure_url,
                    cloudinary_id: uploadImage3.public_id
                },
                text:  userInput.section_3_text
            }
        }

        if (files.section_4_image && files.section_4_image[0].path) {
            await cloudinary.v2.uploader.destroy(
                home.section_4.image.cloudinary_id
            );
            const uploadImage4 = await cloudinary.v2.uploader.upload(
                files.section_4_image[0].path
            );
            formData.section_4 = {
                image: {
                    avatar: uploadImage4.secure_url,
                    cloudinary_id: uploadImage4.public_id
                },
                text:  userInput.section_4_text
            }
        }

        if (files.section_5_image &&files.section_5_image[0].path) {
            await cloudinary.v2.uploader.destroy(
                home.section_5.image.cloudinary_id
            );
            const uploadImage5 = await cloudinary.v2.uploader.upload(
                files.section_5_image[0].path
            );
            formData.section_5 = {
                image: {
                    avatar: uploadImage5.secure_url,
                    cloudinary_id: uploadImage5.public_id
                },
                text:  userInput.section_5_text
            }
        }

        if (files.section_6_image &&files.section_6_image[0].path) {
            await cloudinary.v2.uploader.destroy(
                home.section_6.image.cloudinary_id
            );
            const uploadImage6 = await cloudinary.v2.uploader.upload(
                files.section_6_image[0].path
            );
            formData.section_6 = {
                image: {
                    avatar: uploadImage6.secure_url,
                    cloudinary_id: uploadImage6.public_id
                },
                text:  userInput.section_6_text
            }
        }

        if (files.section_7_image_1 &&files.section_7_image_1[0].path) {
            await cloudinary.v2.uploader.destroy(
                home.section_7.box_1_image.cloudinary_id
            );
            const uploadImage7_1 = await cloudinary.v2.uploader.upload(
                files.section_7_image_1[0].path
            );
            formData.section_7 = {
                box_1_image: {
                    avatar: uploadImage7_1.secure_url,
                    cloudinary_id: uploadImage7_1.public_id
                },
                box_2_image: {
                    avatar: home.section_7.box_2_image.avatar,
                    cloudinary_id: home.section_7.box_2_image.cloudinary_id
                },
                box_3_image: {
                    avatar: home.section_7.box_3_image.avatar,
                    cloudinary_id: home.section_7.box_3_image.cloudinary_id
                },
                title:  userInput.section_7_title
            }
        }

        if (files.section_7_image_2 &&files.section_7_image_2[0].path) {
            await cloudinary.v2.uploader.destroy(
                home.section_7.box_2_image.cloudinary_id
            );
            const uploadImage7_2 = await cloudinary.v2.uploader.upload(
                files.section_7_image_2[0].path
            );
            formData.section_7 = {
                box_1_image: {
                    avatar: home.section_7.box_1_image.avatar,
                    cloudinary_id: home.section_7.box_1_image.cloudinary_id
                },
                box_2_image: {
                    avatar: uploadImage7_2.secure_url,
                    cloudinary_id: uploadImage7_2.public_id

                },
                box_3_image: {
                    avatar: home.section_7.box_3_image.avatar,
                    cloudinary_id: home.section_7.box_3_image.cloudinary_id
                },
                title:  userInput.section_7_title
            }
        }

        if (files.section_7_image_3 &&files.section_7_image_3[0].path) {
            await cloudinary.v2.uploader.destroy(
                home.section_7.box_3_image.cloudinary_id
            );
            const uploadImage7_3 = await cloudinary.v2.uploader.upload(
                files.section_7_image_3[0].path
            );
            formData.section_7 = {
                box_1_image: {
                    avatar: home.section_7.box_1_image.avatar,
                    cloudinary_id: home.section_7.box_1_image.cloudinary_id
                },
                box_2_image: {
                    avatar: home.section_7.box_2_image.avatar,
                    cloudinary_id: home.section_7.box_2_image.cloudinary_id
                },
                box_3_image: {
                    avatar: uploadImage7_3.secure_url,
                    cloudinary_id: uploadImage7_3.public_id
                },
                title:  userInput.section_7_title
            }
        }

        await Home.findByIdAndUpdate(home._id, formData);
        return {
            message: "Home Page updated successfully!"
        };
    }


    async updateFooter(userInput: any, file: { path: string }) {
        const footer = await Footer.findOne();
        if (!footer) {
            const uploadedImage = await cloudinary.v2.uploader.upload(
                file.path
            );
            await Footer.create({
                image: {
                    avatar: uploadedImage.secure_url,
                    cloudinary_id: uploadedImage.public_id
                },
                text: userInput.text
            });
            return {
                message: "Footer created successfully!"
            };
        }


        if (file && file.path) {
            await cloudinary.v2.uploader.destroy(
                footer.image.cloudinary_id
            );
            const uploadedImage = await cloudinary.v2.uploader.upload(
                file.path
            );

            await Footer.findByIdAndUpdate(footer._id, {
                image: {
                    avatar: uploadedImage.secure_url,
                    cloudinary_id: uploadedImage.public_id
                },
                text: userInput.text
            })

            return {
                message: "Footer updated successfully!"
            };
        }

        await Footer.findByIdAndUpdate(footer._id, {
            text: userInput.text
        })
        return {
            message: "Footer updated successfully!"
        };

    }


    async updateFaq(userInput: any, file: { path: string }) {
        const faq = await Faq.findOne();

        if (!faq) {
            const uploadedImage = await cloudinary.v2.uploader.upload(
                file.path
            );

            await Faq.create({
                section_1: {
                    image: {
                        avatar: uploadedImage.secure_url,
                        cloudinary_id: uploadedImage.public_id
                    },
                    text: userInput.section_1_text
                },
                section_2: {
                    queries: JSON.parse(userInput.queries),
                    text: userInput.section_2_text
                }
            });

            return {
                message: "Faq created successfully!"
            };
        }

        if (file && file.path) {
            await cloudinary.v2.uploader.destroy(
                faq.section_1.image.cloudinary_id
            );
            const uploadedImage = await cloudinary.v2.uploader.upload(
                file.path
            );

            await Faq.findByIdAndUpdate(faq._id, {
                section_1: {
                    image: {
                        avatar: uploadedImage.secure_url,
                        cloudinary_id: uploadedImage.public_id
                    },
                    text: userInput.section_1_text
                },
                section_2: {
                    queries: JSON.parse(userInput.queries),
                    text: userInput.section_2_text
                }
            })

            return {
                message: "Faq updated successfully!"
            };
        }

        await Faq.findByIdAndUpdate(faq._id, {
            section_1: {
                image: {
                    avatar: faq.section_1.image.avatar,
                    cloudinary_id: faq.section_1.image.cloudinary_id
                },
                text: userInput.section_1_text
            },
            section_2: {
                queries: JSON.parse(userInput.queries),
                text: userInput.section_2_text
            }
        })
        return {
            message: "Faq updated successfully!"
        };
    }


    async updateTerm(userInput: any, file: { path: string }) {
        const term = await Term.findOne();
        if (!term) {
            const uploadedImage = await cloudinary.v2.uploader.upload(
                file.path
            );
            await Term.create({
                section_1: {
                    image: {
                        avatar: uploadedImage.secure_url,
                        cloudinary_id: uploadedImage.public_id
                    },
                    text: userInput.section_1_text
                },
                section_2: {
                    text: userInput.section_2_text
                }
            });
            return {
                message: "Term created successfully!"
            };
        }


        if (file && file.path) {
            await cloudinary.v2.uploader.destroy(
                term.section_1.image.cloudinary_id
            );
            const uploadedImage = await cloudinary.v2.uploader.upload(
                file.path
            );

            await Term.findByIdAndUpdate(term._id, {
                section_1: {
                    image: {
                        avatar: uploadedImage.secure_url,
                        cloudinary_id: uploadedImage.public_id
                    },
                    text: userInput.section_1_text
                },
                section_2: {
                    text: userInput.section_2_text
                }
            })

            return {
                message: "Term updated successfully!"
            };
        }

        await Term.findByIdAndUpdate(term._id, {
            section_1: {
                image: {
                    avatar: term.section_1.image.avatar,
                    cloudinary_id: term.section_1.image.cloudinary_id
                },
                text: userInput.section_1_text
            },
            section_2: {
                text: userInput.section_2_text
            }
        })
        return {
            message: "Term updated successfully!"
        };
    }

    async updatePolicy(userInput: any, file: { path: string }) {
        const policy = await Policy.findOne();
        if (!policy) {
            const uploadedImage = await cloudinary.v2.uploader.upload(
                file.path
            );
            await Policy.create({
                section_1: {
                    image: {
                        avatar: uploadedImage.secure_url,
                        cloudinary_id: uploadedImage.public_id
                    },
                    text: userInput.section_1_text
                },
                section_2: {
                    text: userInput.section_2_text
                }
            });
            return {
                message: "Policy created successfully!"
            };
        }


        if (file && file.path) {
            await cloudinary.v2.uploader.destroy(
                policy.section_1.image.cloudinary_id
            );
            const uploadedImage = await cloudinary.v2.uploader.upload(
                file.path
            );

            await Policy.findByIdAndUpdate(policy._id, {
                section_1: {
                    image: {
                        avatar: uploadedImage.secure_url,
                        cloudinary_id: uploadedImage.public_id
                    },
                    text: userInput.section_1_text
                },
                section_2: {
                    text: userInput.section_2_text
                }
            })

            return {
                message: "Policy updated successfully!"
            };
        }

        await Policy.findByIdAndUpdate(policy._id, {
            section_1: {
                image: {
                    avatar: policy.section_1.image.avatar,
                    cloudinary_id: policy.section_1.image.cloudinary_id
                },
                text: userInput.section_1_text
            },
            section_2: {
                text: userInput.section_2_text
            }
        })
        return {
            message: "Policy updated successfully!"
        };
    }

    async createHome(userInput: any, files: any) {

        const { section_1_image_1, section_1_image_2, section_1_image_3,  section_2_image, section_3_image, section_4_image, section_5_image, section_6_image, section_7_image_1, section_7_image_2, section_7_image_3 } =
            files as unknown as IUploadMultipleHome;

        if(
            section_1_image_1 && section_1_image_1.length > 0 && section_1_image_2 && section_1_image_2.length > 0
            && section_1_image_3 && section_1_image_3.length > 0 &&
            section_2_image && section_2_image.length > 0 && section_3_image && section_3_image.length > 0
            && section_4_image && section_4_image.length > 0 && section_5_image && section_5_image.length > 0
            && section_6_image && section_6_image.length > 0  && section_7_image_1 && section_7_image_1.length > 0
            && section_7_image_2 && section_7_image_2.length > 0  && section_7_image_3 && section_7_image_3.length > 0
        ) {

            const uploadImage1_1Promise = cloudinary.v2.uploader.upload(
                section_1_image_1[0].path
            );

            const uploadImage1_2Promise = cloudinary.v2.uploader.upload(
                section_1_image_2[0].path
            );

            const uploadImage1_3Promise = cloudinary.v2.uploader.upload(
                section_1_image_3[0].path
            );
            const uploadImage2Promise = cloudinary.v2.uploader.upload(
                section_2_image[0].path
            );

            const uploadImage3Promise = cloudinary.v2.uploader.upload(
                section_3_image[0].path
            );
            const uploadImage4Promise = cloudinary.v2.uploader.upload(
                section_4_image[0].path
            );

            const uploadImage5Promise = cloudinary.v2.uploader.upload(
                section_5_image[0].path
            );

            const uploadImage6Promise = cloudinary.v2.uploader.upload(
                section_6_image[0].path
            );

            const uploadImage7_1Promise = cloudinary.v2.uploader.upload(
                section_7_image_1[0].path
            );

            const uploadImage7_2Promise = cloudinary.v2.uploader.upload(
                section_7_image_2[0].path
            );

            const uploadImage7_3Promise = cloudinary.v2.uploader.upload(
                section_7_image_3[0].path
            );



            const [uploadImage1_1, uploadImage1_2, uploadImage1_3, uploadImage2, uploadImage3, uploadImage4, uploadImage5, uploadImage6, uploadImage7_1, uploadImage7_2, uploadImage7_3] =
                await Promise.all([uploadImage1_1Promise, uploadImage1_2Promise,
                    uploadImage1_3Promise, uploadImage2Promise, uploadImage3Promise,
                    uploadImage4Promise, uploadImage5Promise, uploadImage6Promise,
                    uploadImage7_1Promise, uploadImage7_2Promise, uploadImage7_3Promise
                ])




            const formData = {
                section_1: {
                    slider_1: {
                        image: {
                            avatar: uploadImage1_1.secure_url,
                            cloudinary_id: uploadImage1_1.public_id
                        },
                        text: userInput.section_1_1_text
                    },
                    slider_2: {
                        image: {
                            avatar: uploadImage1_2.secure_url,
                            cloudinary_id: uploadImage1_2.public_id
                        },
                        text: userInput.section_1_2_text
                    },
                    slider_3: {
                        image: {
                            avatar: uploadImage1_3.secure_url,
                            cloudinary_id: uploadImage1_3.public_id
                        },
                        text: userInput.section_1_3_text
                    }
                },
                section_2: {
                    image: {
                        avatar: uploadImage2.secure_url,
                        cloudinary_id: uploadImage2.public_id
                    }
                },
                section_3: {
                    image: {
                        avatar: uploadImage3.secure_url,
                        cloudinary_id: uploadImage3.public_id
                    },
                    text:  userInput.section_3_text
                },
                section_4: {
                    image: {
                        avatar: uploadImage4.secure_url,
                        cloudinary_id: uploadImage4.public_id
                    },
                    text:  userInput.section_4_text
                },
                section_5: {
                    image: {
                        avatar: uploadImage5.secure_url,
                        cloudinary_id: uploadImage5.public_id
                    },
                    text:  userInput.section_5_text
                },
                section_6: {
                    image: {
                        avatar: uploadImage6.secure_url,
                        cloudinary_id: uploadImage6.public_id
                    },
                    text:  userInput.section_6_text
                },

                section_7: {
                    title:  userInput.section_7_title,
                    box_1_image:  {
                        avatar: uploadImage7_1.secure_url,
                        cloudinary_id: uploadImage6.public_id
                    },
                    box_2_image:  {
                        avatar: uploadImage7_2.secure_url,
                        cloudinary_id: uploadImage6.public_id
                    },
                    box_3_image:  {
                        avatar: uploadImage7_3.secure_url,
                        cloudinary_id: uploadImage6.public_id
                    },
                },
            }

            await Home.create(formData)
            return {
                message: "Home content created successfully!"
            }
        }

        throw new Error("Something went wrong")

    }

    async showAbout() {
        const home = await About.find();
        if (!home) {
            throw new NotFound("No Home Page Found!")
        }
        return home[0];
    }

    async createAbout(userInput: any, files: any) {

        const {  section_1_image, section_2_image, section_3_image, section_4_image, section_5_image } =
            files as unknown as IUploadMultipleAbout;

        if ( section_1_image && section_1_image.length > 0 &&
            section_2_image && section_2_image.length > 0 && section_3_image && section_3_image.length > 0
            && section_4_image && section_4_image.length > 0 && section_5_image && section_5_image.length > 0) {

            const uploadImage1Promise = cloudinary.v2.uploader.upload(
                section_1_image[0].path
            );

            const uploadImage2Promise = cloudinary.v2.uploader.upload(
                section_2_image[0].path
            );

            const uploadImage3Promise = cloudinary.v2.uploader.upload(
                section_3_image[0].path
            );
            const uploadImage4Promise = cloudinary.v2.uploader.upload(
                section_4_image[0].path
            );


            const uploadImage5Promise = cloudinary.v2.uploader.upload(
                section_5_image[0].path
            );


            const [uploadImage1, uploadImage2, uploadImage3, uploadImage4, uploadImage5] =
                await Promise.all([uploadImage1Promise, uploadImage2Promise, uploadImage3Promise, uploadImage4Promise, uploadImage5Promise])




            const formData = {
                section_1: {
                    image: {
                        avatar: uploadImage1.secure_url,
                        cloudinary_id: uploadImage1.public_id
                    },
                    text:  userInput.section_1_text
                },
                section_2: {
                    image: {
                        avatar: uploadImage2.secure_url,
                        cloudinary_id: uploadImage2.public_id
                    },
                    text:  userInput.section_2_text
                },
                section_3: {
                    image: {
                        avatar: uploadImage3.secure_url,
                        cloudinary_id: uploadImage3.public_id
                    },
                    text:  userInput.section_3_text
                },
                section_4: {
                    image: {
                        avatar: uploadImage4.secure_url,
                        cloudinary_id: uploadImage4.public_id
                    },
                    text:  userInput.section_4_text
                },
                section_5: {
                    image: {
                        avatar: uploadImage5.secure_url,
                        cloudinary_id: uploadImage5.public_id
                    },
                    text:  userInput.section_5_text
                }
            }

            await About.create(formData)
            return {
                message: "About content created successfully!"
            }

        }

        throw new Error("Something went wrong")


    }

    async updateAbout(userInput: any, files: any) {
        const about = await About.findOne();
        if (!about) {
            throw new NotFound("No Home Page Found!")
        }

        const formData: any = {
            section_1: {
                image: {
                    avatar: about.section_1.image.avatar,
                    cloudinary_id: about.section_1.image.cloudinary_id
                },
                text:  userInput.section_1_text
            },
            section_2: {
                image: {
                    avatar: about.section_2.image.avatar,
                    cloudinary_id: about.section_2.image.cloudinary_id
                },
                text:  userInput.section_2_text
            },
            section_3: {
                image: {
                    avatar: about.section_3.image.avatar,
                    cloudinary_id: about.section_3.image.cloudinary_id
                },
                text:  userInput.section_3_text
            },
            section_4: {
                image: {
                    avatar: about.section_4.image.avatar,
                    cloudinary_id: about.section_4.image.cloudinary_id
                },
                text:  userInput.section_4_text
            },
            section_5: {
                image: {
                    avatar: about.section_5.image.avatar,
                    cloudinary_id: about.section_5.image.cloudinary_id
                },
                text:  userInput.section_5_text
            }
        }

        if (files.section_1_image && files.section_1_image[0].path) {
            await cloudinary.v2.uploader.destroy(
                about.section_1.image.cloudinary_id
            );
            const uploadImage1 = await cloudinary.v2.uploader.upload(
                files.section_1_image[0].path
            );
            formData.section_1 = {
                image: {
                    avatar: uploadImage1.secure_url,
                    cloudinary_id: uploadImage1.public_id
                },
                text:  userInput.section_1_text
            }
        }

        if (files.section_2_image && files.section_2_image[0].path) {
            await cloudinary.v2.uploader.destroy(
                about.section_2.image.cloudinary_id
            );
            const uploadImage2 = await cloudinary.v2.uploader.upload(
                files.section_2_image[0].path
            );
            formData.section_2 = {
                image: {
                    avatar: uploadImage2.secure_url,
                    cloudinary_id: uploadImage2.public_id
                },
                text:  userInput.section_2_text
            }
        }

        if (files.section_3_image && files.section_3_image[0].path) {
            await cloudinary.v2.uploader.destroy(
                about.section_3.image.cloudinary_id
            );
            const uploadImage3 = await cloudinary.v2.uploader.upload(
                files.section_3_image[0].path
            );
            formData.section_3 = {
                image: {
                    avatar: uploadImage3.secure_url,
                    cloudinary_id: uploadImage3.public_id
                },
                text:  userInput.section_3_text
            }
        }

        if (files.section_4_image && files.section_4_image[0].path) {
            await cloudinary.v2.uploader.destroy(
                about.section_4.image.cloudinary_id
            );
            const uploadImage4 = await cloudinary.v2.uploader.upload(
                files.section_4_image[0].path
            );
            formData.section_4 = {
                image: {
                    avatar: uploadImage4.secure_url,
                    cloudinary_id: uploadImage4.public_id
                },
                text:  userInput.section_4_text
            }
        }

        if (files.section_5_image &&files.section_5_image[0].path) {
            await cloudinary.v2.uploader.destroy(
                about.section_5.image.cloudinary_id
            );
            const uploadImage5 = await cloudinary.v2.uploader.upload(
                files.section_5_image[0].path
            );
            formData.section_5 = {
                image: {
                    avatar: uploadImage5.secure_url,
                    cloudinary_id: uploadImage5.public_id
                },
                text:  userInput.section_5_text
            }
        }


       await About.findByIdAndUpdate(about._id, formData);
        return {
            message: "About Page updated successfully!"
        };
    }
}

export default CmsService;
